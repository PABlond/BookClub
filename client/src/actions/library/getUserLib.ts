import axios from "axios"
import { routes } from "../../config/constants"
import getHeaders from "../../services/getHeaders"

export default async () => {
  const { getUserLib } = routes
  const headers = getHeaders()
  const { data: payload } = await axios.get(getUserLib.url, { headers })

  return {
    type: getUserLib.name,
    payload,
  }
}
