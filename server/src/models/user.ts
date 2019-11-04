import mongoose from "mongoose"

export default mongoose.model(
  "user",
  new mongoose.Schema({
    username: String,
    hash: String,
  })
)
