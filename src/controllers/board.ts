import { FilterQuery, Document, Types, UpdateQuery } from "mongoose";
import boardModel from "../model/board";

interface IBoard {
  title: string;
}

const createBoard = async (req: any) => {
  const newBoard = new boardModel(req.body);
  const response = await newBoard.save();
  return response;
};

const getBoards = async () => {
  const boardList = await boardModel.find();
  return boardList;
};

const getSingleBoard = async (id: Types.ObjectId) => {
  const board = await boardModel.findOne({ _id: id });
  return board;
};

const updateBoard = async (id: Types.ObjectId, newBoardTitle: any) => {
  const board = await boardModel.updateOne({}, { $set: { title: newBoardTitle } });
  if (!board) throw new Error("board does not exist");
  console.log("controller board", board);
  return board;
};

const deleteBoard = async (req: any) => {
  await boardModel.deleteOne(req);
};

export default {
  createBoard,
  getBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard,
};
