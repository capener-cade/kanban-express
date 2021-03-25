import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import Card from "./model/card";

const port = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//TODO:move back to .env file
mongoose.connect("mongodb://localhost:27018/kanban", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) console.log("oh no", err);
  console.log("Connected to the DB");
});

app.get("/", (req, res) => res.send("success"));
app.get("/api/ping", (req, res) => res.send("success"));
// grab a board from the db.
app.get("/api/board/:id/cards", async (req, res) => {
  const cards = await Card.find({ boardId: req.params.id });
  console.log(cards);
  res.send(cards);
});

app.post("/api/board/:id/cards", async (req, res) => {
  // validate the data that goes into the db.
  if (!req.body.boardId) {
    return res.status(400).send("boardId is required");
  }
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.send(newCard);
  } catch (err) {
    res.send({ message: err });
  }
});

app.put("/api/board/:boardId/:cardId", async (req, res) => {
  try {
    await Card.findByIdAndUpdate(req.params.cardId, { column: req.body.column });
    res.sendStatus(204);
  } catch (err) {
    res.send({ message: err });
  }
});

app.put("/api/card/:boardId/:cardId", async (req, res) => {
  try {
    await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      { title: req.body.title, description: req.body.description }
    );
    res.sendStatus(204);
  } catch (err) {
    res.send({ message: err });
  }
});

app.delete("/api/board/:boardId/:cardId", async (req, res) => {
  try {
    console.log(req.params.boardId);
    console.log(req.params.cardId);
    await Card.deleteOne({ _id: req.params.cardId });
    res.sendStatus(204);
  } catch (err) {
    res.send({ message: err });
  }
});

app.listen(port).once("listening", () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
