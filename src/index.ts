import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import Card from '../model/card';

const port = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('Connected to the DB');
  });

app.get('/', (req, res) => res.send('success'));
app.get('/api/ping', (req, res) => res.send('success'));
// grab a board from the db.
app.get('/api/board/:id', (req, res) => res.send());

app.post('/api/board/:id', async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.send(newCard);
  } catch (err) {
    res.send({ message: err });
  }
});

app.delete('/api/board/:id/', (req, res) => res.status(201).send(`card ${req.params.cardTitle} was deleted`));

app.listen(port)
  .once('listening', () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${port}`);
  });
