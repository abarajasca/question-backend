import { Router} from 'express'
const router = Router();
import  { check } from 'express-validator'

import { createUser,loginUser,renewToken } from '../controllers/auth.js'
import { handleValidationResult } from '../middlewares/handleValidationResult.js'
import { validateJWT }  from '../middlewares/validateJWT.js'

router.post('/',
    [
        check('email','email format is required.').isEmail(),
        check('password','password must be almost 6 characters.').isLength({ min: 6}),
        handleValidationResult    
    ],
    loginUser) ;

router.post('/new',[
    check('name','name is required.').not().isEmpty(),
    check('name','minimum name lengh is 6 characters.').isLength({min: 6}),
    check('email','email format is required.').isEmail(),
    check('password','password must be almost 6 characters.').isLength({ min: 6}),
    handleValidationResult
], createUser);
router.get('/renew',
    [
        validateJWT
    ],
    renewToken );

export default router;