function sendError(err, res) {
  if (err.name === 'ValidationError' || err.kind === 'string') {
    res.status(400).send({ message: 'Введены не корректные данные', err }); //  если ошибка при валидации
  } else if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Введен не корректный идентификатор', err }); //  если ош из-за невер id (н-р: короткий)
  } else if (err.status === 404 && err.entityType) {
    if (err.entityType === 'user') {
      res.status(404).send({ message: 'Не удалось найти пользователя', err }); //  если id корректный но такого id нет
    } else if (err.entityType === 'card') {
      res.status(404).send({ message: 'Не удалось найти карточку', err }); //  если id корректный но такого id нет
    }
  } else {
    res.status(500).send(err); //  если еще какая напасть
  }
}

function setOrFailError(entityTypeAsString) {
  const err = new Error();
  err.status = 404;
  err.entityType = entityTypeAsString;
  throw err;
}

module.exports = { sendError, setOrFailError };

/*
function setOrFailErrorMessage(entityTypeAsString) {
  const err = new Error();
  if (entityTypeAsString === 'card') {
    err.message = 'Не удалось найти карточку';
  } else if (entityTypeAsString === 'user') {
    err.message = 'Не удалось найти пользователя';
  } else {
    err.message = 'Не удалось найти экземпляр сущности';
  }
  throw err;
}
*/

/*
function handleErrors(err, res) {
  if (err.name === 'ValidationError' || err.kind === 'string') {
    res.status(400).send({ message: 'Введены не корректные данные', err }); //  если ошибка при валидации
  } else if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Введен не корректный идентификатор', err }); //  если ош из-за невер id (н-р: короткий)
  } else if (
    err.message === 'Не удалось найти пользователя'
    || err.message === 'Не удалось найти карточку'
  //  || err.message === 'Не удалось найти карточки'
  //  ну, ничего страшного наверно- вернем пустой массив
  ) {
    res.status(404).send({ message: err.message, err }); //  если id корректный но такого id нет
  } else {
    res.status(500).send(err); //  если еще какая напасть
  }
}
*/
