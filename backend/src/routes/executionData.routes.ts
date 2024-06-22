// ./src/routes/executionData.routes.ts
import { Router } from 'express';
import {
    createExecutionData,
    getExecutionData,
    getExecutionDataById,
    updateExecutionData,
    deleteExecutionData
} from '../controllers/executionData.controllers';
import checkAuth from '../middlewares/auth.middleware';

const router = Router();

router.post('/', checkAuth, createExecutionData);
router.get('/', checkAuth, getExecutionData);
router.get('/:id', checkAuth, getExecutionDataById);
router.put('/:id', checkAuth, updateExecutionData);
router.delete('/:id', checkAuth, deleteExecutionData);

export default router;
