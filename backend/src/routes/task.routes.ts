//src/controllers/task.controllers.ts
import { Router } from 'express';
import {
    createTask,
    getTasks,
    addMilestonesToTask,
    removeMilestonesFromTask,
    addCardsToTask,
    removeCardsFromTask,
    getTask,
    updateTask,
    deleteTask,
    getTaskMilestones,
    getTaskCards,
    deleteAllTasks,
    exportTask
} from '../controllers/task.controllers';
import checkAuth from '../middlewares/auth.middleware';

const router = Router();

router.post('/', checkAuth, createTask);
router.get('/', checkAuth, getTasks);
router.get('/:id', checkAuth, getTask);
router.put('/:id', checkAuth, updateTask);
router.delete('/:id', checkAuth, deleteTask);
router.get('/:id/milestones', checkAuth, getTaskMilestones);
router.get('/:id/cards', checkAuth, getTaskCards);
router.post('/:id/milestones', checkAuth, addMilestonesToTask);
router.post('/:id/cards', checkAuth, addCardsToTask);
router.delete('/:id/milestones', checkAuth, removeMilestonesFromTask);
router.delete('/:id/cards', checkAuth, removeCardsFromTask);
router.delete('/', checkAuth, deleteAllTasks);
router.get('/:id/export', exportTask);

export default router;
