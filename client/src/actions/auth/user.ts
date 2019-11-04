import axios from "axios"
import { routes } from "./../../config/constants"
import getHeaders from './../../services/getHeaders'

export default async () => {
  const {
    user: { url, name },
    authErr: { name: errName },
  } = routes

  const headers = getHeaders()
  const { data, status, err } = (await axios
    .get(url, { headers })
    .catch((err: any) => ({ err }))) as any

  if (status == 201) {
    const { username } = data
    return { type: name, payload: { username } }
  }
  return { type: errName, payload: err.toString() }
}
