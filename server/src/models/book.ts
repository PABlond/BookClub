import mongoose from "mongoose"

export default mongoose.model(
  "book",
  new mongoose.Schema({
    id: String,
    owner: String
  })
)
