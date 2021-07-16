import express from 'express'
import { getPosts, getPostDetail, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPostDetail)

/* apply Authentication middleware to CRUD operations */
router.post('/', authMiddleware, createPost)
router.patch('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/likePost', authMiddleware, likePost)

export default router
