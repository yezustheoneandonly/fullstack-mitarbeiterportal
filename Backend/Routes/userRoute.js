import express from 'express'
import { createUser, getAllUsers, login, logout, returnUserData, updateUser } from '../Controller/userController.js';
import { checkInOut } from '../Controller/checkController.js';
import jwtAuthMiddleware from '../Middleware/jwtAuthMiddleware.js'
import { roleChecker } from '../Middleware/roleHandler.js';

const router = express.Router()

router.post("/login", login)
router.get('/logout', logout)
router.post('/createuser', jwtAuthMiddleware, roleChecker, createUser)
router.put('/updateuser/:id', jwtAuthMiddleware, roleChecker, updateUser)
router.get('/getalluser', jwtAuthMiddleware, getAllUsers)
router.get('/whoami', jwtAuthMiddleware, roleChecker, returnUserData)
router.post('/clockmein', jwtAuthMiddleware, checkInOut)


export default router;

