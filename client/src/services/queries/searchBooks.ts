import axios from "axios"
import { routes } from "../../config/constants"

export default async (q: string) => {
  const { getBooks } = routes
  const params = { q }
  const { data } = await axios.get(getBooks.url, { params })

  return data
}
