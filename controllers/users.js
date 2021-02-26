const User = require('../models/user');
const { sendError, setOrFailError } = require('../helpers/error-handling-helpers');

const entityType = 'user';

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => sendError(err, res));
};

const getProfile = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, about }, { new: true, runValidators: true })
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { avatar }, { new: true, runValidators: true })
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
};
