import { Types } from "mongoose";
import boardModel, { IBoardModel } from "../model/board";

const createBoard = async (req: any): Promise<IBoardModel> => {
  const newBoard = new boardModel(req.body);
  const response = await newBoard.save();
  return response;
};

const getBoards = async (): Promise<IBoardModel[]> => {
  const boardList = await boardModel.find();
  return boardList;
};

const getSingleBoard = async (id: Types.ObjectId): Promise<IBoardModel | null> => {
  const board = await boardModel.findOne({ _id: id });
  return board;
};

const updateBoard = async (id: Types.ObjectId, newBoardTitle: string): Promise<IBoardModel> => {
  const board = await boardModel.findById(id);
  if (!board) throw new Error("board does not exist");
  board.title = newBoardTitle;
  await board.save();
  return board;
};

const deleteBoard = async (id: Types.ObjectId): Promise<void> => {
  await boardModel.deleteOne(id);
};

export default {
  createBoard,
  getBoards,
  getSingleBoard,
  updateBoard,
  deleteBoard,
};
