
export type BookData = {
  id: number,
  title: string,
  author: string,
  price: number,
  coverImage: string
}

export default class BookstoreService {

    data = [
      {
        id: 10,
        title: 'Production-Ready Microservices',
        author: 'Susan J. Fowler',
        price: 32,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg'},
      {
        id: 22,
        title: 'Release It!',
        author: 'Michael T. Nygard',
        price: 45,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg'},
      {
        id: 32,
        title: 'Learn Spring Boot',
        author: 'Prof. HR Ansari',
        price: 87,
        coverImage: 'https://m.media-amazon.com/images/I/31HWp0zhWtS.jpg'}
    ]

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.75) {
                reject(new Error('Something bad happened'))
              } else {
                resolve(this.data)
              }
            }, 700)
        })
      }
}