const path = require('path');
const getDataFromFile = require('../helpers/files');
const Card = require('../models/card');
//  console.log(Card);
const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Не удалось выполнить создание карточки' }));
};

const deleteCard = (req, res) => {
//  console.log(req);
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'не удалось удалить карточку' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
