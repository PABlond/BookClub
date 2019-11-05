import Books from "./../../controllers/book"
import Book from "./../../models/book"
import Auth from "../../controllers/auth"
import mongoose from "mongoose"
import User from "./../../models/user"
import dotenv from "dotenv"

dotenv.config()
const auth = new Auth()
const book = new Books()

describe("search terms", () => {
  test("should render a list of books", async (done: any) => {
    const response = await book.getBooks({ q: "paris" })
    expect(response.length).toBeGreaterThanOrEqual(0)
    expect(
      response.every((book: any) => {
        const bookArr = Object.keys(book)
        return (
          bookArr.indexOf("title") !== -1 &&
          bookArr.indexOf("authors") !== -1 &&
          bookArr.indexOf("description") !== -1 &&
          bookArr.indexOf("publishedDate") !== -1 &&
          bookArr.indexOf("imageLinks") !== -1
        )
      })
    ).toBe(true)
    done()
  })
})

describe("add book to library", () => {
  test("should return 404  and error with wrong username", async (done: any) => {
    const id = "F3VOAQAACAAJ"
    const username = "FakeUsername"
    const response = await book.addBookToLib({ username, id })
    expect(response[0]).toBe(404)
    expect(response[1]).toBe("User does not exists")
    done()
  })

  test("should return false with wrong id", async (done: any) => {
    const id = "wrongId"
    const username = "BookTest"
    const response = await book.addBookToLib({ username, id })
    expect(response[0]).toBe(503)
    expect(response[1]).toBe("Service Unavailable")
    done()
  })

  test("should return 201 with good username and good id", async (done: any) => {
    const id = "F3VOAQAACAAJ"
    const username = "BookTest"
    const response = await book.addBookToLib({ username, id })
    expect(response[0]).toBe(201)
    done()
  })

  test("should return 201 and create a document in library with good username and good id", async (done: any) => {
    const id = "F3VOAQAACAAJ"
    const username = "BookTest"
    const response = (await book.addBookToLib({ username, id })) as any
    expect(response[1].id).toBe(id)
    done()
  })
})

describe("Get library of the user", () => {
  test("should return 404 if user is not found", async (done: any) => {
    const username = "FakeUsername"
    const response = await book.getUserLib({ username })
    expect(response[0]).toBe(404)
    expect(response[1]).toBe("User does not exists")
    done()
  })

  test("should return 201 if user is found", async (done: any) => {
    const username = "BookTest"
    const response = await book.getUserLib({ username })
    expect(response[0]).toBe(201)
    done()
  })

  test("should return an array of books if user is found", async (done: any) => {
    const username = "BookTest"
    const response = (await book.getUserLib({ username })) as any
    expect(response[1].length).toBeGreaterThanOrEqual(0)
    done()
  })
})

describe("Get library details", () => {
  test("should return 404 if user is not found", async (done: any) => {
    const username = "WrongUsername"
    const [code, response] = await book.getLibDetails({ username })
    expect(code).toBe(404)
    expect(response).toBe("User does not exists")
    done()
  })

  test("should return 201 if user is found", async (done: any) => {
    const username = "BookTest"
    const [code, _] = await book.getLibDetails({ username })
    expect(code).toBe(201)
    done()
  })

  test("should return an organized array if user is found", async (done: any) => {
    const id = "ox9BiuVKM1cC"
    const username = "BookTest"
    await book.addBookToLib({ username, id })
    const [_, response] = await book.getLibDetails({ username })
    expect(
      (response as any).every((book: any) => {
        const bookArr = Object.keys(book)
        return (
          bookArr.indexOf("title") !== -1 &&
          bookArr.indexOf("authors") !== -1 &&
          bookArr.indexOf("description") !== -1 &&
          bookArr.indexOf("publishedDate") !== -1 &&
          bookArr.indexOf("imageLinks") !== -1
        )
      })
    ).toBe(true)
    done()
  })
})

describe("Delete book in library", () => {
  test("should return 404 if user is not found", async (done: any) => {
    const username = "WrongUsername"
    const id = "ox9BiuVKM1cC"
    await book.addBookToLib({ username, id })
    const [code, response] = await book.deleteBook({ username, id })
    expect(code).toBe(404)
    expect(response).toBe("User does not exists")
    done()
  })

  test("should return 404 if id is not found in the user library", async (done: any) => {
    const username = "BookTest"
    const id = "WrongId"
    const [code, response] = await book.deleteBook({ username, id })
    expect(code).toBe(404)
    expect(response).toBe("Book is not found")
    done()
  })

  test("should return 201 if user is found", async (done: any) => {
    const username = "BookTest"
    const id = "ox9BiuVKM1cC"
    await book.addBookToLib({ username, id })
    const [code, response] = await book.deleteBook({ username, id })
    expect(code).toBe(201)
    expect(response).toBe('OK')
    done()
  })

  test("should return 201 if user is found", async (done: any) => {
    const username = "BookTest"
    const id = "ox9BiuVKM1cC"
    await book.addBookToLib({ username, id })
    let deleted = await book.deleteBook({ username, id })
    expect(deleted[0]).toBe(201) as any
    const [code, response] = (await book.getUserLib({ username })) as any
    expect(code).toBe(201)
    expect(
      response.every(({ id: bookId }: { id: string }) => bookId !== id)
    ).toBe(true)
    done()
  })
})

beforeAll(async () => {
  const { MONGO_DB } = process.env
  mongoose.connect(MONGO_DB as string, {
    useNewUrlParser: true
  })

  const username = "BookTest"
  const hash = ".FakeHash."
  await auth.createUser({ username, hash })
})

beforeEach(async () => {
  const id = "F3VOAQAACAAJ"
  await Book.remove({ id })
})

afterAll(async () => {
  const username = "BookTest"
  const { _id: id } = (await User.findOne({ username })) as any
  await User.remove({ username })
  await Book.remove({ id })
})
