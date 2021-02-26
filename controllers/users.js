const User = require('../models/user');
const { handleErrors } = require('../helpers/handleErrors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getProfile = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error();
      err.message = 'Запрашиваемый профиль не найден';
      //  console.log(err);
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Не удалось выполнить создание пользователя' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Не удалось выполнить обновление данных пользователя' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Не удалось выполнить обновление аватара пользователя' }));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
};
