import { Router } from 'express';
import {
    createCard,
    getCards,
    executeCardController,
    getCardById,
    deleteAllCards,
    deleteCardById,
    evaluateCardById,
    setNextCard,
    setPreviousCard,
    removeNextCard,
    removePreviousCard,
    getPreviousCardsOutputsController,
    updateCard
} from '../controllers/card.controllers';
import checkAuth from '../middlewares/auth.middleware';

const router = Router();

router.post('/', checkAuth, createCard);
router.get('/', checkAuth, getCards);
router.get('/without-populate', checkAuth, getCards);
router.get('/:id', checkAuth, getCardById);
router.post('/execute/:id', checkAuth, executeCardController);
router.delete('/:id', checkAuth, deleteCardById);
router.delete('/', checkAuth, deleteAllCards);
router.post('/evaluate/:id', checkAuth, evaluateCardById);
router.put('/set-next/:currentCardId', checkAuth, setNextCard);
router.put('/set-previous/:currentCardId', checkAuth, setPreviousCard);
router.put('/remove-next/:currentCardId', checkAuth, removeNextCard);
router.put('/remove-previous/:currentCardId', checkAuth, removePreviousCard);
router.get('/previous-cards-outputs/:id', checkAuth, getPreviousCardsOutputsController);
router.put('/:id', checkAuth, updateCard);

export default router;
