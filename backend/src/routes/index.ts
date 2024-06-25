// src/routes/index.ts

import express from 'express';

import taskRouter from './task.routes';
import milestoneRouter from './milestone.routes';
import cardRouter from './card.routes';
import executionDataRouter from './executionData.routes';
import promptEnhancementRouter from './promptEnhancement.routes';

const router = express.Router();

router.use('/api/tasks', taskRouter);
router.use('/api/milestones', milestoneRouter);
router.use('/api/cards', cardRouter);
router.use('/api/executionData', executionDataRouter);
router.use('/api/promptEnhancement', promptEnhancementRouter);

export default router;
