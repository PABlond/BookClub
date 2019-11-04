import { getToken } from "./../actions/auth/helpers"

export default () => ({ Authorization: `Bearer ${getToken()}` })
