const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
} = require('../middlewares/validation');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get('/users/:userId', auth, validateUserId, getUserById);
router.patch('/users/me', auth, validateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', auth, validateUpdateAvatar, updateAvatar);

module.exports = router;
