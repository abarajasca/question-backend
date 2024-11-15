// route path: /api/llm

const Router = require('express');
const { validateLLM,generateTest, testLLMResponse } = require('../controllers/llm');

const router = Router();
router.get("/validate",validateLLM);
router.get("/generateTest",generateTest);
router.get("/testLLMResponse",testLLMResponse);

module.exports = router;