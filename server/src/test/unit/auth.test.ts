import Auth from "../../controllers/auth"
import mongoose from "mongoose"
import User from "./../../models/user"
import dotenv from "dotenv"
const auth = new Auth()

dotenv.config()

describe("Test isUserExists", () => {
  test("It should return true when a user exists", async () => {
    const username = "unitTest"
    await new User({ username }).save()
    const response = await auth.isUserExists({ username })
    await User.remove({ username })
    expect(response).toBe(true)
  })

  test("It should return false when a user does not exists", async () => {
    const username = "unitTest"
    const response = await auth.isUserExists({ username })
    expect(response).toBe(false)
  })
})

describe("Test createUser", () => {
  test("It should create a user in the database", async () => {
    const username = "unitTest"
    const hash = "test-hash"
    await auth.createUser({ username, hash })
    const response = await auth.isUserExists({ username })
    await User.remove({ username })
    expect(response).toBe(true)
  })
})

describe("Test getUser", () => {
  test("It should retrieve a user in the database", async () => {
    const username = "unitTest"
    await new User({ username }).save()
    const response = (await auth.getUser(username)) as any
    await User.remove({ username })
    expect(response.username).toBe(username)
  })
})

describe("Test getToken", () => {
  test("It should create a token", async () => {
    const username = "unitTest"
    const response = await auth.getToken({ username })
    expect(response.length).toBeGreaterThan(0)
  })
})

describe("Test decodeToken", () => {
  test("It should decode a token", async () => {
    const username = "unitTest"
    const token = auth.getToken({ username })
    const response = auth.decodeToken(token) as { username: string }
    expect(response.username).toBe(username)
  })
})

beforeAll(async () => {
  const { MONGO_DB } = process.env
  mongoose.connect(MONGO_DB as string, {
    useNewUrlParser: true
  })
})
