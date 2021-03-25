import mongoose from "mongoose";

const Card = new mongoose.Schema({
  boardId: { type: Number, required: true },
  column: { type: String, required: true, enum: ["Backlog", "ToDo", "Doing", "Done"] },
  title: String,
  description: String,
});

export default mongoose.model("card", Card);
