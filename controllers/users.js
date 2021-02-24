const path = require('path');
const getDataFromFile = require('../helpers/files');
const { User } = require('../models/user');
console.log(User);

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => getDataFromFile(dataPath)
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err));

const getProfile = (req, res) => getDataFromFile(dataPath)
  .then((users) => {
    const userBeingRequested = users.find((user) => user._id === req.params.id);
    if (!userBeingRequested) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    res.status(200).send(userBeingRequested);
    return false;
  })
  .catch((err) => res.status(500).send(err));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Не удалось выполнить создание пользователя' }));
};

module.exports = { getUsers, getProfile, createUser };
