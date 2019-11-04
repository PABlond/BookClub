import express from "express"
import mongoose from "mongoose"
import Router from "./routes"
import passport from "passport"
import bodyParser from "body-parser"
import cors from "cors"
import jwtStatregy from "./config/jwtStatregy"
require("dotenv").config()

const { MONGO_DB } = process.env

mongoose.connect(MONGO_DB as string, {
  useNewUrlParser: true
})
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(passport.initialize())
jwtStatregy(passport)
app.get("/", function(req, res) {
  res.status(201).json("Done")
})

app.use(Router)

export default app
