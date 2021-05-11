import mongoose, { Mongoose } from "mongoose";

const Card = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, required: true },
  column: { type: String, required: true, enum: ["Backlog", "ToDo", "Doing", "Done"] },
  title: String,
  description: String,
});

export default mongoose.model("card", Card);
