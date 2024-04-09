import express from "express";
import {
    getUser,
} from "../controllers/homeController.js";

const router = express.Router();

router.get('/user', getUser) // localhost:5000/api/home/user

export default router;