import boardModel from "../model/board";

const createBoard = async (req: any) => {
  const newBoard = new boardModel(req.body);
  const response = await newBoard.save();
  return response;
};

const getBoards = async () => {
  const boardList = await boardModel.find();
  return boardList;
};

export default {
  createBoard,
  getBoards,
};
