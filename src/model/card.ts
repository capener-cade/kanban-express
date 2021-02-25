import mongoose from 'mongoose';

const Card = new mongoose.Schema({
  boardId: Number,
  column: String,
  title: String,
});

export default mongoose.model('card', Card);
