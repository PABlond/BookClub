import axios from "axios"
import { routes } from "../../config/constants"
import getHeaders from "../getHeaders"

export default async () => {
  const { getLibDetails } = routes

  const headers = getHeaders()
  const { data } = await axios.get(getLibDetails.url, { headers })

  return data
}
