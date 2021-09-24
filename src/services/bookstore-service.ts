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

    getBooks = async () => {
      const res = await fetch(`${this.apiBase}/books`);
      if (!res.ok) {
        throw new Error('My Error message');
      } else return res.json();
    }

    getBookWithParams = async (
      title: string,
      author: string,
    ) => {
      const encodedTitle = encodeURIComponent(title);
      const encodedAuthor = encodeURIComponent(author);
      const res = await fetch(`${this.apiBase}/books?title=${encodedTitle}&author=${encodedAuthor}`);
      if (!res.ok) {
        throw new Error('My Error message');
      } else return res.json();
    }

    getBookById = async (id: number) => {
      const res = await fetch(`${this.apiBase}/books/${id}`);
      if (!res.ok) {
        throw new Error('My Error message');
      } else return res.json();
    }

    addBook = async (data: AddBookData) => {
      const res = await fetch(`${this.apiBase}/books`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          price: data.price,
          coverImage: data.coverImage,
        }),
      });
      if (!res.ok) {
        throw new Error('My Error message');
      }
    }

    updateBook = async (data: BookData) => {
      const res = await fetch(`${this.apiBase}/books/${data.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          price: data.price,
          coverImage: data.coverImage,
        }),
      });
      if (!res.ok) {
        throw new Error('My Error message');
      }
    }
}
