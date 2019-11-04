import axios from "axios"
import { ILogin } from "./../../interfaces/auth.interface"
import { routes } from "./../../config/constants"
import { setToken } from "./helpers"

export default async ({ username, password }: ILogin) => {
  const {
    login: { url, name },
    authErr: { name: errName },
  } = routes

  const {
    data: { token },
    status,
    err,
  } = (await axios
    .post(url, { username, password })
    .catch((err: any) => ({ err }))) as any
  if (status == 201) {
    setToken(token)
    return { type: name, payload: { username } }
  }
  return { type: errName, payload: err.toString() }
}
