// route path: /api/llm

import Router from 'express'
import { validateLLM, generateTest, openPrompt, skillsMatch } from '../controllers/llm.js'

const router = Router();

/**
 * @swagger
 * /llm/validate:
 *   get:
 *     summary: Validate Llm service status
 *     tags: [Large Language Model]
 *     responses:
 *       200:
 *         description: Successfull result
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: Service Ready
 *       400:
 *         description: Successfull result
 *         content:
 *           application/json:
 *             example: 
 *               ok: false
 *               msg: Service not available.
 */
router.get("/validate",validateLLM);

/**
 * @swagger
 * /llm/generateTest:
 *   get:
 *     summary: Generate questionarie based in some parameters
 *     tags: [Large Language Model]
 *     parameters:
 *       - name: llm
 *         in: query
 *         required: true
 *         description: Large Language name( gemini, chatgpt, copilot ) 
 *         schema: 
 *           type: string
 *         example:
 *           gemini
 *       - name: topic
 *         in: query
 *         required: true
 *         description: Topic to generate questions.
 *         schema: 
 *           type: string
 *         example:
 *           Terraform
 *       - name: questionNumber
 *         in: query
 *         required: false
 *         description: Number of questions to be generated.
 *         schema: 
 *           type: number
 *         example:
 *           20
 *       - name: language
 *         in: query
 *         required: false
 *         description: Language of the questions.
 *         schema: 
 *           type: string
 *         example:
 *           english
 *     responses:
 *       200:
 *         description: Successful result
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               parameters: 
 *                 llm: 'gemini'
 *                 topic: 'Terraform'
 *                 questionNumber: 20
 *                 language: 'english'
 *               runningTime: 162
 *               test:
 *                 questions_and_answers:
 *                   - question: 'What is terraform?'
 *                     correct_answer: "Terraform is awesome!!"
 *                     incorrect_answers:
 *                       - 'Terraform is a magic tool'
 *                       - 'Terraform is not from this plannet'
 *       400:
 *         description: Bad format result
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Parameter is Missing
 *       500:
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Internal Server Error
 */
router.get("/generateTest",generateTest);

/**
 * @swagger
 * /llm/openPrompt:
 *   get:
 *     summary: Send a open prompt to Llm
 *     tags: [Large Language Model]
 *     parameters:
 *       - name: prompt
 *         in: query
 *         required: true
 *         description: Open prompt to llm. 
 *         schema: 
 *           type: string
 *         example:
 *           What is a CST timezone
 *     responses:
 *       200:
 *         description: Successful result
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               runningTime: 192
 *               result: 
 *                 ok: true
 *                 text: CST stands for **Central Standard Time**.  It's a time zone six hours behind Coordinated Universal Time (UTC-6).  However, it's important to note that the *exact* locations that observe CST can vary depending on the time of year due to daylight saving time (DST).  During DST, many locations that normally observe CST switch to CDT (Central Daylight Time), which is UTC-5.
 *       400:
 *         description: Bad format result
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Parameter is Missing
 *       500:
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Internal Server Error
 */
router.get("/openPrompt",openPrompt);

/**
 * @swagger
 * /llm/skillsMatch:
 *   post:
 *     summary: Run a skills match
 *     tags: [Large Language Model]
 *     requestBody:
 *       description: Resume and skills to run the match
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               resume: 
 *                 type: string
 *               skills:
 *                 type: string[]
 *             example:
 *               resume: 'Software developer with experience in Javascript and Angular'
 *               skills: 
 *                 - Javascript
 *                 - Angular
 *                 - React 
 *     responses:
 *       200:
 *         description: Successful result
 *         content:
 *           application/json:
 *             example:
 *               ok: true,
 *               runningTime: 43
 *               skills: 
 *                 - name: Javascript
 *                   proficiency: 80
 *                   reason: The resume explicitly mentions Javascript experience.  A high proficiency is assumed given it's a foundational language for front-end development and often used extensively in Angular projects.
 *                 - name: Angular
 *                   proficiency: 70
 *                   reason: The resume explicitly states experience with Angular.  The proficiency is set slightly lower than Javascript as expertise in Javascript is typically a prerequisite for Angular development, and the level of Angular expertise is unknown without further detail.
 *       400:
 *         description: Bad format result
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Parameter is Missing 
 *       500:
 *         description: Internal Server error
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Internal Server Error
 */
router.post("/skillsMatch",skillsMatch);

export default router;