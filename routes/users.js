const router = require('express').Router();
const {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getProfile);
router.post('/', createUser);
router.patch('/me', updateProfile); //  обновляет профиль
router.patch('/me/avatar', updateAvatar); //  обновляет аватар

module.exports = router;
