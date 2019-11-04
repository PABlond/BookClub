import initialState from "./initialState"
import { routes } from "./../config/constants"

export default (
  state = initialState.auth,
  action: { type: string; payload: any }
) => {
  const { authErr, signup, login, user } = routes
  const { type, payload } = action
  switch (type) {
    case signup.name:
    case login.name:
    case user.name:
      return {
        ...state,
        username: payload.username,
      }
    case authErr.name:
      return {
        ...state,
        error: payload,
      }
    default:
      return state
  }
}
