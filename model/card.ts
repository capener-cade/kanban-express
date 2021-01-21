import mongoose from 'mongoose';

const Card = new mongoose.Schema({
  column: String,
  title: String,
});

export default mongoose.model('card', Card);
