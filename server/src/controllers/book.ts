import axios from "axios"
import Auth from "./auth"
import Book from "./../models/book"
import User from "./../models/user"

const auth = new Auth()

export default class Books {
  googleBookApi = "https://www.googleapis.com/books/v1/volumes"

  getBooks = async ({ q }: { q: string }) => {
    const url = `${this.googleBookApi}?q=${q}`
    const {
      data: { items }
    } = await axios.get(url)
    const books = items.map(this.mapBookData)

    return books
  }

  addBookToLib = async ({ username, id }: { username: string; id: string }) => {
    const user = await auth.getUser(username)
    if (!!!user) return [404, "User does not exists"]

    const { data, err } = await this.getBookDetails({ id })
    if (err) {
      return [err.response.status, err.response.statusText]
    }
    const {
      volumeInfo: {
        imageLinks: { smallThumbnail, thumbnail } = {
          smallThumbnail: undefined,
          thumbnail: undefined
        }
      }
    } = data
    return [
      201,
      await new Book({
        id,
        owner: user._id,
        photos: { smallThumbnail, thumbnail }
      })
        .save()
        .catch(err => err)
    ]
  }

  deleteBook = async ({ username, id }: { username: string; id: string }) => {
    const user = await auth.getUser(username)
    if (!!!user) return [404, "User does not exists"]
    const book = await Book.findOne({id})
    if (!!!book) return [404, 'Book is not found']
    await Book.remove({id})
    return [201, 'OK']
  }

  getUserLib = async ({ username }: { username: string }) => {
    const user = await auth.getUser(username)
    if (!!!user) return [404, "User does not exists"]
    const { _id: owner } = user
    const lib = await this.getLib({ owner })
    return [201, lib]
  }

  getLibDetails = async ({ username }: { username: string }) => {
    const user = await auth.getUser(username)
    if (!!!user) return [404, "User does not exists"]
    const { _id: owner } = user
    const lib = await this.getLib({ owner })
    const books = []
    for await (const book of lib) {
      const { id } = book
      const { data, err, status } = await this.getBookDetails({ id })
      if (data) {
        const {
          id,
          volumeInfo: { title, authors, description, publishedDate, imageLinks }
        } = data
        books.push({
          id,
          title,
          authors,
          description,
          publishedDate,
          imageLinks
        })
      }
    }

    return [201, books]
  }

  getBookDetails = async ({ id }: { id: string }) => {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`

    const { data, err, status } = (await axios
      .get(url)
      .catch(err => ({ err }))) as any
    return { data, err, status }
  }

  getLib = async ({ owner }: { owner: string }) => {
    return await Book.find({ owner }).catch(err => err)
  }

  mapBookData = ({
    id,
    volumeInfo: { title, authors, description, publishedDate, imageLinks }
  }: any) => ({
    id,
    title,
    authors,
    description,
    publishedDate,
    imageLinks
  })
}
