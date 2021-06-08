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
  const board = await boardModel.findById(id);
  if (!board) throw new Error("board does not exist");
  board.title = "newlyUpdatedBoard";
  await board.save();
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
