import BooksData from "./booksdata"

export type BookData = {
  id: number,
  title: string,
  author: string,
  price: number,
  coverImage: string
}

export default class BookstoreService {

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 1) {
                reject(new Error('Something bad happened'))
              } else {
                const booksData = new BooksData()
                resolve(booksData.data)
              }
            }, 700)
        })
      }
}