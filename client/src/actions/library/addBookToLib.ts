import axios from "axios"
import { routes } from "../../config/constants"
import getHeaders from "../../services/getHeaders"

export default async (id: string) => {
  const { addBookToLib } = routes
  const headers = getHeaders()
  console.log(headers)
  const { data } = await axios.put(addBookToLib.url, { id }, { headers })

  return {
    type: addBookToLib.name,
    payload: data,
  }
}
