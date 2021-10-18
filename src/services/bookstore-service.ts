import axios from 'axios';

export type BookData = {
  id: number,
  title: string,
  author: string,
  price: number,
  coverImage: string
}

export type AddBookData = {
  title: string,
  author: string,
  price: number,
  coverImage: string
}

export default class BookstoreService {
    apiBase = 'http://localhost:8000'

    // getBooks = async (): Promise<Array<BookData>> => {
    //   const res = await fetch(`${this.apiBase}/books`);
    //   if (!res.ok) {
    //     throw new Error('My Error message');
    //   } else return res.json();
    // }

    getBooks = async (): Promise<Array<BookData>> => axios
      .get(`${this.apiBase}/books`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.toString());
      })

    // getBookWithParams = async (
    //   title: string,
    //   author: string,
    // ): Promise<BookData> => {
    //   const encodedTitle = encodeURIComponent(title);
    //   const encodedAuthor = encodeURIComponent(author);
    //   const res = await fetch(
    //   `${this.apiBase}/books?title=${encodedTitle}&author=${encodedAuthor}`
    //   );
    //   if (!res.ok) {
    //     throw new Error('My Error message');
    //   } else return res.json();
    // }

  getBookWithParams = async (
    title: string,
    author: string,
  ): Promise<BookData> => {
    const encodedTitle = encodeURIComponent(title);
    const encodedAuthor = encodeURIComponent(author);
    return axios
      .get(`${this.apiBase}/books?title=${encodedTitle}&author=${encodedAuthor}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.toString());
      });
  }

  // getBookById = async (id: number): Promise<BookData> => {
  //   const res = await fetch(`${this.apiBase}/books/${id}`);
  //   if (!res.ok) {
  //     throw new Error('My Error message');
  //   } else return res.json();
  // }

  getBookById = async (id: number): Promise<BookData> => axios
    .get(`${this.apiBase}/books/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.toString());
    })

  // addBook = async (data: AddBookData): Promise<void> => {
  //   const res = await fetch(`${this.apiBase}/books`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: data.title,
  //       author: data.author,
  //       price: data.price,
  //       coverImage: data.coverImage,
  //     }),
  //   });
  //   if (!res.ok) {
  //     throw new Error('My Error message');
  //   }
  // }

  addBook = async (data: AddBookData): Promise<void> => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      title: data.title,
      author: data.author,
      price: data.price,
      coverImage: data.coverImage,
    });
    await axios
      .post(`${this.apiBase}/books`, body, { headers })
      .catch((error) => {
        throw new Error(error.toString());
      });
  }

  // updateBook = async (data: BookData): Promise<void> => {
  //   const res = await fetch(`${this.apiBase}/books/${data.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: data.title,
  //       author: data.author,
  //       price: data.price,
  //       coverImage: data.coverImage,
  //     }),
  //   });
  //   if (!res.ok) {
  //     throw new Error('My Error message');
  //   }
  // }

  updateBook = async (data: BookData): Promise<void> => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      title: data.title,
      author: data.author,
      price: data.price,
      coverImage: data.coverImage,
    });
    await axios
      .put(`${this.apiBase}/books/${data.id}`, body, { headers })
      .catch((error) => {
        throw new Error(error.toString());
      });
  }
}
