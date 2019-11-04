import { combineReducers } from "redux"
import auth from './auth'
import library from './library'

export default combineReducers({ auth, library })