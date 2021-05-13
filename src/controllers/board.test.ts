import boardController from "./board";
import boardModel from "../model/board";

describe("board controller", () => {
  describe("create board", () => {
    const newBoard = { title: "new board" };
    beforeEach(() => {
      jest.spyOn(boardModel.prototype, "save").mockImplementation(() => newBoard);
    });

    afterEach(() => {
      // boardModel.prototype.restore();
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
      expect(response).toBe(newBoard);
    });
  });
});
