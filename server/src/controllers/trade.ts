import User from "../models/user"
import Book from "./book"
import Auth from "./auth"

const auth = new Auth()
const book = new Book()

export default class Trade {
  preTradeInfo = async ({ id, owner }: { id: string; owner: string }) => {
    const user = (await User.findOne({ _id: owner })) as any
    if (!!!user) return [404, "User does not exists"]
    const { data, err } = await book.getBookDetails({ id })

    if (err || !!!((await book.getBook({ id, owner })) as any))
      return [404, "Book is not found"]
    return [201, book.mapBookData(data)]
  }
}
