const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validation');

router.get('/cards', auth, getCards);
router.post('/cards', auth, validateCreateCard, createCard);
router.delete('/cards/:cardId', auth, validateCardId, deleteCard);
router.put('/cards/:cardId/likes', auth, validateCardId, likeCard);
router.delete('/cards/:cardId/likes', auth, validateCardId, dislikeCard);

module.exports = router;
