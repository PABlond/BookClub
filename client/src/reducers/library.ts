import initialState from "./initialState"
import { routes } from "./../config/constants"

export default (
  state = initialState.library,
  action: { type: string; payload: any }
) => {
  const { addBookToLib, getUserLib } = routes
  const { type, payload } = action
  switch (type) {
    case addBookToLib.name:
      return [...state, payload]
    case getUserLib.name:
      return payload
    default:
      return state
  }
}
