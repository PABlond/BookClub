import Trade from "../../controllers/trade"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const trade = new Trade()

describe("Test method preTradeInfo", () => {
  test("Should return code 404 if user is not found", async (done: any) => {
    const id = "WrongUserId"
    const owner = "WrongOwnerId"
    const [code, response] = await trade.preTradeInfo({ id, owner })
    expect(code).toBe(404)
    expect(response).toBe("User does not exists")
    done()
  })

  test("Should return code 201 if user is found", async (done: any) => {
    const id = "csQfVW3fnAwC"
    const owner = "5dbe930138d2fe16103cb05f"
    const [code, _] = await trade.preTradeInfo({ id, owner })
    expect(code).toBe(201)
    done()
  })

  test("Should return code 404 if id is not found", async (done: any) => {
    const id = "WrongOwnerId"
    const owner = "5dbe930138d2fe16103cb05f"
    const [code, response] = await trade.preTradeInfo({ id, owner })
    expect(code).toBe(404)
    expect(response).toBe("Book is not found")
    done()
  })

  test("Should return code 404 if book is not found in the db", async (done: any) => {
    const id = "WrongOwnerId"
    const owner = "5dbe930138d2fe16103cb05f"
    const [code, response] = await trade.preTradeInfo({ id, owner })
    expect(code).toBe(404)
    expect(response).toBe("Book is not found")
    done()
  })

  test("Should return book detail if user is found and id is valid", async (done: any) => {
    const id = "csQfVW3fnAwC"
    const owner = "5dbe930138d2fe16103cb05f"
    const [code, response] = await trade.preTradeInfo({ id, owner })
    expect(code).toBe(201)
    expect(
      [response].every((book: any) => {
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

beforeAll(async () => {
  const { MONGO_DB } = process.env
  mongoose.connect(MONGO_DB as string, {
    useNewUrlParser: true
  })
})
