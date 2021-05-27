import boardController from "./board";
import boardModel from "../model/board";
import { Types } from "mongoose";

describe("board controller", () => {
  const newBoard = { title: "new board" };
  let id: any;
  beforeEach(() => {
    id = Types.ObjectId();
  });

  describe("create board", () => {
    beforeEach(() => {
      jest.spyOn(boardModel.prototype, "save").mockImplementation(() => newBoard);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should be a function", () => {
      expect(typeof boardController.createBoard === "function").toBeTruthy();
    });

    it("should save a board to the database", async () => {
      await boardController.createBoard({ test: 123 });
      expect(boardModel.prototype.save).toBeCalled();
    });

    it("should return the new board", async () => {
      const response = await boardController.createBoard({ body: newBoard });
      expect(response).toStrictEqual(newBoard);
    });
  });

  describe("get all board", () => {
    beforeEach(() => {
      jest.spyOn(boardModel, "find").mockImplementation(() => [newBoard as any, newBoard as any] as any);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should be a function", () => {
      expect(typeof boardController.getBoards === "function").toBeTruthy();
    });

    it("should search the database for all boards", async () => {
      await boardController.getBoards();
      expect(boardModel.find).toHaveBeenCalled();
    });

    it("should return a list of boards", async () => {
      const response = await boardController.getBoards();
      expect(response).toStrictEqual([newBoard, newBoard]);
    });
  });

  describe("get a single board", () => {
    beforeEach(() => {
      jest.spyOn(boardModel, "findOne").mockImplementation(() => newBoard as any);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should be a function", () => {
      expect(typeof boardController.getSingleBoard === "function").toBeTruthy();
    });

    it("should search the database for a board", async () => {
      await boardController.getSingleBoard(id);
      expect(boardModel.findOne).toHaveBeenCalledWith({ _id: id });
    });

    it("should return a single board", async () => {
      const response = await boardController.getSingleBoard(id);
      expect(response).toStrictEqual(newBoard);
    });
  });

  describe("update a board", () => {
    beforeEach(() => {
      jest.spyOn(boardModel, "updateOne").mockImplementation(() => newBoard as any);
      boardModel.prototype.save = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should be a function", () => {
      expect(typeof boardController.updateBoard === "function").toBeTruthy();
    });

    it("should call updateOne", async () => {
      const newBoardTitle = "newlyUpdatedBoard";
      await boardController.updateBoard(id, newBoardTitle);
      expect(boardModel.updateOne).toHaveBeenCalledWith({}, { $set: { title: newBoardTitle } });
    });

    it("should return the updated the board", async () => {
      const newBoardTitle = "newlyUpdatedBoard";
      const updatedBoard = await boardController.updateBoard(id, newBoardTitle);
      console.log("test updatedBoard", updatedBoard);
      expect(updatedBoard).toEqual({ title: "newlyUpdatedBoard" });
    });

    // describe("when the board does not exist", () => {
    //   beforeEach(() => {
    //     jest.spyOn(boardModel, "findOne").mockImplementation(() => undefined);
    //   });

    //   afterEach(() => {
    //     jest.restoreAllMocks();
    //   });

    //   it("should throw an error", async () => {
    //     await expect(boardController.updateBoard(id, { title: "no board" })).rejects.toThrow();
    //   });
    // });
  });

  // describe("delete a board", () => {
  //   console.log("delete was hit");
  // });
});
