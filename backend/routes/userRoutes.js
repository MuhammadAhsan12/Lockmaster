import express from 'express'
const router= express.Router()
import{authUser, createUser, getUserProfile, updateUserProfile, getAccountRecoveryCode, authRecoveryUser, updateUserPassword, getUsers, getUserById, updateUserStatus, updateUser} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').post(createUser).get(protect, admin, getUsers)
router.post('/login', authUser) 
router.post('/accountrecovery', getAccountRecoveryCode)  
router.post('/login/recovery',  authRecoveryUser)   
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/password').put(protect, updateUserPassword)
router.route('/status').put(protect, admin, updateUserStatus)
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser)


export default router