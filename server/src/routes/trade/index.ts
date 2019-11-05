import express from "express"
import controllers from "../../controllers"
import passport from "passport"

const { Trade } = controllers
const trade = new Trade()

const Router = express.Router()

Router.route("/").get(async (req, res) => {
  const [code, response] = await trade.preTradeInfo(req.query)

  return res.status(code as number).json(response)
})

export default Router
