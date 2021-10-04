import React, {
  useEffect, useState, useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import './add-book-form.css';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addBookToCatalogAsync } from '../../actions';
import MyContext from '../bookstore-service-context/bookstore-service-context';
import { AppDispatch } from '../../store';

interface SubmitAddBookData {
  author: string,
  coverImage: FileList,
  price: number,
  title: string
}

const AddBookForm = (): JSX.Element => {
  const serviceValue = useContext(MyContext);
  const dispatch: AppDispatch = useDispatch();
  const [bookAdded, setBookAdded] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const schema = yup.object().shape({
    title: yup.string().required('Book Title should be filled in'),
    author: yup.string().required('Book Author should be filled in'),
    price: yup.number().required().positive('Book Price should be positive number'),
    coverImage: yup.mixed().test('fileType', 'Image should be uploaded', (value) => value && value.length !== 0),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchImage = watch('coverImage');

  useEffect(() => {
    if (watchImage) {
      if (watchImage[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(watchImage[0]);
        reader.onload = () => {
          const src = reader.result as string;
          setImageSrc(src);
        };
      }
    }
  }, [watchImage]);

  const onSubmit = (data: SubmitAddBookData) => {
    const newData = {
      title: data.title,
      author: data.author,
      price: data.price,
      coverImage: imageSrc,
    };
    dispatch(addBookToCatalogAsync(serviceValue, newData))
      .then(() => setBookAdded(true));

    setTimeout(() => {
      setBookAdded(false);
      reset({});
      setImageVisible(false);
    }, 3000);
  };

  return (
    <div>
      <form className="add-book-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="inputTitle" className="title-label">Book Title</label>
        <input id="inputTitle" type="text" placeholder="title" {...register('title')} />
        {errors.title && (<p>{errors.title.message}</p>)}

        <label htmlFor="inputAuthor">Book Author</label>
        <input id="inputAuthor" type="text" placeholder="author" {...register('author')} />
        {errors.author && (<p>{errors.author.message}</p>)}

        <label htmlFor="inputPrice">Book Price</label>
        <input id="inputPrice" type="number" placeholder="price in $" {...register('price')} />
        {errors.price && (getValues('price') === '') && (<p>Book Price should be filled in</p>)}
        {errors.price && (getValues('price') < 0) && (<p>{errors.price.message}</p>)}

        <label htmlFor="temp-id">Book Cover Image</label>
        <label className="upload-file-btn">
          Browse
          <input type="file" id="file1" accept=".png, .jpg, .jpeg" {...register('coverImage')} />
        </label>

        {watchImage && (watchImage.length !== 0)
                && (<img id="image1" alt="cover_image1" width="120px" height="200px" src={imageSrc} />)}
        {errors.coverImage && !imageVisible && (<p>{errors.coverImage.message}</p>)}

        <input type="submit" value="Add new book" className="btn btn-info" />
        {bookAdded && (<p className="book-added-confirmation">Book successfully added</p>)}
      </form>
    </div>
  );
};

export default AddBookForm;
