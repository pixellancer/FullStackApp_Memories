import express from 'express'
import { signin, signup, update } from '../controllers/users.js'
import authMiddleware from '../middleware/auth.js'


const router = express.Router() 

router.post('/signin',signin)
router.post('/signup',signup)
router.patch('/:id/profile',authMiddleware,update)


export default router