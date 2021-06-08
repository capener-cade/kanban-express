import mongoose, { Document } from "mongoose";

export interface IBoardModel {
  title: string;
}

const Board = new mongoose.Schema<IBoardModel>({
  title: String,
});

export default mongoose.model<IBoardModel>("board", Board);
