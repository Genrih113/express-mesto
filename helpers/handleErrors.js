const handleErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.kind === 'string') {
    res.status(400).send({ message: 'Введены не корректные данные' });
  } else if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Введен не корректный идентификатор' });
  } else if (
    err.message === 'Не удалось найти пользователя'
    || err.message === 'Не удалось найти карточку'
    || err.message === 'Не удалось найти карточки'
  ) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send(err);
  }
};

module.exports = handleErrors;
