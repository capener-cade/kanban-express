import mongoose from "mongoose";

const Board = new mongoose.Schema({
  title: String,
});

export default mongoose.model("board", Board);
