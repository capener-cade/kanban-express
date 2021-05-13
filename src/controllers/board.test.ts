import boardController from "./board";
import boardModel from "../model/board";

describe("board controller", () => {
  const newBoard = { title: "new board" };

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
});
