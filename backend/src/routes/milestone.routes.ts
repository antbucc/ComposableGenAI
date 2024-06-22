// src/routes/milestone.routes.ts
import { Router } from 'express';
import {
    createMilestone,
    getMilestones,
    getMilestone,
    updateMilestone,
    deleteMilestone,
    addCardsToMilestone,
    removeCardsFromMilestone,
    getMilestoneCards,
} from '../controllers/milestone.controllers';
import checkAuth from '../middlewares/auth.middleware';
const router = Router();

router.post('/', checkAuth, createMilestone);
router.get('/', checkAuth, getMilestones);
router.get('/:id', checkAuth, getMilestone);
router.put('/:id', checkAuth, updateMilestone);
router.delete('/:id', checkAuth, deleteMilestone);
router.get('/:id/cards', checkAuth, getMilestoneCards);
router.post('/:id/cards', checkAuth, addCardsToMilestone);
router.delete('/:id/cards', checkAuth, removeCardsFromMilestone);

export default router;
