const router = require('express').Router();
const { getUsers, getProfile, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getProfile);
router.post('/', createUser);

module.exports = router;
