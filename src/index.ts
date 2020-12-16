import express from 'express';
const users = require('../data/users.json') 

const port = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('success'));
app.get('/api/user/:id', (req, res) => res.send(users[req.params.id].firstName));
app.get('/api/boards', (req, res) => res.send('board was hit'));
app.get('/api/card', (req, res) => res.send('card success'));

app.post('api/user', (req,res) => res.send('create a user'));
app.post('/api/boards', (req, res) => res.send('create a single board'));
app.post('/api/card', (req, res) => res.send('create a single card'));

app.put('api/board/:id'), (res: { send: (arg0: string) => any; }) => res.send('update a board');
app.put('api/card/:id'), (res: { send: (arg0: string) => any; }) => res.send('update a single card');

app.delete('api/board/:id'), (res: { send: (arg0: string) => any; }) => res.send('delete a board');
app.delete('api/card/:id'), (res: { send: (arg0: string) => any; }) => res.send('delete a single card');


app.listen(port)
  .once('listening', () => {
    console.log(`listening on port ${port}`);
  });
