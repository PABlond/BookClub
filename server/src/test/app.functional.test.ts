import request from "supertest"
import app from "./../app"
import Auth from "../controllers/auth"
import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./../models/user"

const auth = new Auth()

dotenv.config()

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/")
    expect(response.status).toBe(201)
  })
})

describe("Test the /api/user path", () => {
  test("It should response with user object", async () => {
    const username = "test"
    await new User({ username }).save()
    const bearer = `Bearer ${auth.getToken({ username })}`
    const response = await request(app)
      .get("/api/user")
      .set("Authorization", bearer)
    await User.remove({ username })
    expect(response.status).toBe(201)
    expect(response.body.username).toBe(username)
  })

  test("It should signup a user", async () => {
    const username = "test"
    const password = "test"
    const response = await request(app)
      .put("/api/user")
      .send({ username, password })
    expect(response.status).toBe(201)
  })
})

describe("Test the api /api/user/book", () => {
  test("It should response the PUT method", async () => {
    const password = "test"
    const id = "F3VOAQAACAAJ"
    const username = "test"
    await new User({ username }).save()
    const bearer = `Bearer ${auth.getToken({ username })}`
    const response = await request(app)
      .put("/api/user/book")
      .set("Authorization", bearer)
      .send({ username, id })
    expect(response.status).toBe(201)
  })

  test("It should response the GET method", async () => {
    const password = "test"
    const id = "F3VOAQAACAAJ"
    const username = "test"
    await new User({ username }).save()
    const bearer = `Bearer ${auth.getToken({ username })}`
    const response = await request(app)
      .get("/api/user/book")
      .set("Authorization", bearer)
    expect(response.status).toBe(201)
  })

  test("It should response the DELETE method", async () => {
    const password = "test"
    const id = "F3VOAQAACAAJ"
    const username = "test"
    await new User({ username }).save()
    const bearer = `Bearer ${auth.getToken({ username })}`
    await request(app)
      .put("/api/user/book")
      .set("Authorization", bearer)
      .send({ username, id })
    const response = await request(app)
      .delete("/api/user/book")
      .set("Authorization", bearer)
      .send({ id })
    expect(response.status).toBe(201)
  })
})

describe("Test the /api/user/book/details path", () => {
  test("It should response the GET method", async () => {
    const username = "test"
    await new User({ username }).save()
    const bearer = `Bearer ${auth.getToken({ username })}`
    const response = await request(app)
      .get("/api/user/book/details")
      .set("Authorization", bearer)
    expect(response.status).toBe(201)
  })
})

describe("Test the /api/books path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/books")
    expect(response.status).toBe(201)
  })
})

describe("Test the /api/trade path", () => {
  test("It should response the GET method", async () => {
    const id = "csQfVW3fnAwC"
    const owner = "5dbe930138d2fe16103cb05f"
    const response = await request(app)
      .get("/api/trade")
      .query({ id, owner })
    console.log(response.status)
    expect(response.status).toBe(201)
  })
})

beforeAll(async () => {
  const { MONGO_DB } = process.env
  mongoose.connect(MONGO_DB as string, {
    useNewUrlParser: true
  })
})
