import User from "./../models/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

require("dotenv").config()

const { JWT_SECRET } = process.env

export default class Auth {
  jwt_secret = JWT_SECRET as string

  isUserExists = async ({ username }: { username: string }) => {
    return !!(await User.findOne({ username }))
  }

  getUser = (username: string) => {
    return User.findOne({ username })
  }

  createUser = async (user: { username: string; hash: string }) => {
    await new User(user).save()
  }

  hashPassword = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  checkPassword = (password: string, hash: string) =>
    bcrypt.compareSync(password, hash)

  getToken = ({ username }: { username: string }) =>
    jwt.sign({ username }, this.jwt_secret)

  decodeToken = (token: string) => jwt.verify(token, this.jwt_secret)

  signup = async ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    const isUserExists = await this.isUserExists({ username })
    if (!isUserExists) {
      const hash = this.hashPassword(password)
      await this.createUser({ username, hash })
      const token = this.getToken({ username })
      return [201, { token }]
    } else return [409, "User already exists"]
  }

  login = async ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    const { hash } = (await this.getUser(username)) as any
    if (hash) {
      if (this.checkPassword(password, hash)) {
        const token = this.getToken({ username })
        return [201, { token }]
      } else return [400, "Password is not correct"]
    } else return [409, "User already exists"]
  }
}
