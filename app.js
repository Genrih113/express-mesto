const express = require('express');
const path = require('path');
// const fs = require('fs');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

/* app.get('/users', (req, res) => {
  const reader = fs.createReadStream('./data/users.json', { encoding: 'utf8' });
  reader.pipe(res);
}); */

/* app.get('/cards', (req, res) => {
  const reader = fs.createReadStream('./data/cards.json', { encoding: 'utf8' });
  reader.pipe(res);
}); */

app.listen(PORT);
