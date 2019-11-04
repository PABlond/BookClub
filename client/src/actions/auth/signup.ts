import axios from "axios"
import { ISignup } from "./../../interfaces/auth.interface"
import { routes } from "./../../config/constants"
import { setToken } from "./helpers"

export default async ({ username, password, confirmation }: ISignup) => {
  const {
    signup: { url, name },
    authErr: { name: errName },
  } = routes
  if (confirmation === password) {
    const {
      data: { token },
      status,
      err,
    } = (await axios
      .put(url, { username, password })
      .catch((err: any) => ({ err }))) as any
    if (status == 201) {
      setToken(token)
      return { type: name, payload: { username } }
    }
    return { type: errName, payload: err.toString() }
  }
  return { type: errName, payload: "Password and Confirmation are different" }
}
