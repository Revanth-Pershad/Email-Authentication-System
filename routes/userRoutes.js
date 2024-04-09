import express from "express";
import {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect , getMe)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

export default router;