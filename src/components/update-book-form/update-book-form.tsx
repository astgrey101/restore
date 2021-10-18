import React, {
  FC, useContext, useEffect, useMemo, useState,
} from 'react';
import './update-book-form.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BookData } from '../../services/bookstore-service';
import MyContext from '../bookstore-service-context';
import { updateBookInCatalogAsync } from '../../actions';
import { AppDispatch } from '../../store';
import { getBookItemById } from '../../reducers/selectors';

interface BookItemType {
    bookId: number,
    switchDisplayEditForm: (value: boolean) => void
}

interface SubmitUpdateBookData {
  author: string,
  coverImage: FileList,
  price: number,
  title: string
}

const UpdateBookForm: FC<BookItemType> = ({ bookId, switchDisplayEditForm }) => {
  const serviceValue = useContext(MyContext);
  const dispatch: AppDispatch = useDispatch();
  const [bookUpdated, setBookUpdated] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [uploadImage, setUploadImage] = useState('');

  const schema = yup.object().shape({
    title: yup.string().required('Book Title should be filled in'),
    author: yup.string().required('Book Author should be filled in'),
    price: yup.number().required().positive('Book Price should be positive number'),
    coverImage: yup.mixed(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const updatedBookSelector = useSelector(getBookItemById);
  const updatedBook = useMemo(() => updatedBookSelector(bookId), [bookId]) as BookData;

  const watchImage = watch('coverImage', updatedBook.coverImage);

  useEffect(() => {
    const getUpdatedImage = () => {
      let imageSource = '';
      if (watchImage.length !== 0) {
        if (typeof watchImage !== 'string') {
          if (watchImage[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(watchImage[0]);
            reader.onload = () => {
              const src = reader.result as string;
              setImageSrc(src);
            };
            imageSource = imageSrc;
          }
        } else imageSource = updatedBook.coverImage;
      } else imageSource = updatedBook.coverImage;
      return imageSource;
    };
    const url = getUpdatedImage() as string;
    setUploadImage(url);
  }, [watchImage, imageSrc, updatedBook.coverImage]);

  useEffect(() => {
    reset({
      title: updatedBook.title,
      author: updatedBook.author,
      price: updatedBook.price,
    });
  }, [updatedBook, reset]);

  const onSubmit = (data: SubmitUpdateBookData) => {
    let updateCoverImageValue: string;
    if (data.coverImage.length !== 0) {
      updateCoverImageValue = imageSrc;
    } else {
      updateCoverImageValue = updatedBook.coverImage;
    }
    const newData = {
      id: updatedBook.id,
      title: data.title,
      author: data.author,
      price: data.price,
      coverImage: updateCoverImageValue,
    };
    dispatch(updateBookInCatalogAsync(serviceValue, newData))
      .then(() => setBookUpdated(true));

    setTimeout(() => {
      setBookUpdated(false);
    }, 3000);
  };

  return (
    <div>
      <form className="update-book-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="update-book-container">
          <div className="update-book-image-container">
            <label htmlFor="temp-id">
              Book Cover Image
            </label>
            <img data-testid="update-book-image" id="image2" alt="cover_image2" width="120px" height="200px" src={uploadImage} />
            <label className="upload-file-btn" htmlFor="file2">
              Browse
              <input data-testid="update-book-input-image" type="file" id="file2" accept=".png, .jpg, .jpeg" {...register('coverImage')} />
            </label>
            {/* {errors.coverImage && (<p>{errors.coverImage.message}</p>)} */}
          </div>
          <div className="update-book-group">
            <div>
              <label htmlFor="inputTitle" className="title-label">Book Title</label>
              <input data-testid="edit-book-input-title" id="inputTitle" type="text" placeholder="title" {...register('title')} />
              {errors.title && (<p>{errors.title.message}</p>)}
            </div>
            <div>
              <label htmlFor="inputAuthor">Book Author</label>
              <input data-testid="edit-book-input-author" id="inputAuthor" type="text" placeholder="author" {...register('author')} />
              {errors.author && (<p>{errors.author.message}</p>)}
            </div>
            <div>
              <label htmlFor="inputPrice">Book Price</label>
              <input data-testid="edit-book-input-price" id="inputPrice" type="number" placeholder="price in $" {...register('price')} />
              {errors.price && (getValues('price') === '') && (<p>Book Price should be filled in</p>)}
              {errors.price && (getValues('price') < 0) && (<p>{errors.price.message}</p>)}
            </div>
          </div>
        </div>
        <div className="update-book-group3">
          <input data-testid="save-edit-book-btn" type="submit" value="Save changes" className="btn btn-info save-edit-book" />
          <button data-testid="cancel-edit-book-btn" className="btn btn-info cancel-edit-book" type="button" onClick={() => switchDisplayEditForm(false)}>
            Cancel Editing
          </button>
        </div>
      </form>
      {bookUpdated && (<p className="book-added-confirmation">Book successfully updated</p>)}
    </div>
  );
};

export default UpdateBookForm;
