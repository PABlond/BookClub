import express from "express"
import controllers from "./../controllers/"
import passport from "passport"
const { Auth, Books } = controllers

const Router = express.Router()

const auth = new Auth()
const book = new Books()

Router.route("/user")
  .get(passport.authenticate("jwt", { session: false }), async (req, res) => {
    return res.status(201).json(req.user)
  })
  .put(async (req, res) => {
    const [code, response] = await auth.signup(req.body)
    return res.status(code as number).json(response)
  })
  .post(async (req, res) => {
    const [code, response] = await auth.login(req.body)
    return res.status(code as number).json(response)
  })

Router.route("/user/book")
  .put(passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { username } = req.user as any
    const { id } = req.body
    const [code, response] = await book.addBookToLib({ username, id })
    return res.status(code).json(response)
  })
  .get(passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { username } = req.user as any

    const [code, response] = await book.getUserLib({ username })
    return res.status(code).json(response)
  })

Router.route("/user/book/details").get(
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [code, response] = await book.getLibDetails(req.user as {
      username: string
    })

    return res.status(code as number).json(response)
  }
)

Router.route("/books").get(async (req, res) => {
  return res.status(201).json(await book.getBooks(req.query))
})

export default Router
