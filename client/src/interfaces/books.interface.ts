export interface IBook {
  id: string
  authors: string[]
  title: string
  description: string
  publishedDate: string
  imageLinks: {
    smallThumbnail: string
    thumbnail: string
  }
}

export interface ILibBook {
  _id: string,
  owner: string,
  id: string
}