import express from 'express';
import MiddlewareFn from './types'
const board = require('../data/boards.json') 

const port = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => res.send('success'));
app.get('/api/ping',(req, res) => res.send('success'))
app.get('/api/board/:id', (req, res) => res.send(board[req.params.id]));

app.put('/api/board/:id', (req,res)=> {
  return res.status(201).send(`user ${req.params.id} was updated`);
});

app.delete('/api/board/:id/:cardTitle', (req,res)=> {
  return res.status(201).send(`card ${req.params.cardTitle} was deleted`);
})


app.listen(port)
  .once('listening', () => {
    console.log(`listening on port ${port}`);
  });
