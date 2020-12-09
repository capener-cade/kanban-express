import express from 'express';

const port = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('success'));

app.listen(port)
  .once('listening', () => {
    console.log(`listening on port ${port}`);
  });
