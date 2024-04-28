import express from 'express'

import jwtAuthMiddleware from '../Middleware/jwtAuthMiddleware.js'
import { roleChecker } from '../Middleware/roleHandler.js';
import { addMember, createProject, getAllProjects, getMembers, getNonMembers, getProjectById, updateProject } from '../Controller/projectController.js';

const router = express.Router()


router.post('/createproject', jwtAuthMiddleware, roleChecker, createProject)
router.post('/addmember/:id', jwtAuthMiddleware, addMember)
router.get('/getmember/:id', jwtAuthMiddleware, getMembers)
router.get('/getnonmember/:id', jwtAuthMiddleware, getNonMembers)
router.get('/getproject/:id', jwtAuthMiddleware, getProjectById)
router.get('/getallproject', jwtAuthMiddleware, getAllProjects)
router.put('/updateproject/:id', jwtAuthMiddleware, roleChecker, updateProject)



export default router;