// src/routes/promptEnhancement.routes.ts

import { Router } from 'express';
import { enhancePromptController } from '../controllers/promptEnhancement.controllers';

import checkAuth from '../middlewares/auth.middleware';

const router = Router();

router.post('/enhance', checkAuth, enhancePromptController);

export default router;
