// route path: /api/llm

import Router from 'express'
import { validateLLM, generateTest, testLLMResponse } from '../controllers/llm.js'

const router = Router();
router.get("/validate",validateLLM);
router.get("/generateTest",generateTest);
router.get("/testLLMResponse",testLLMResponse);

export default router;