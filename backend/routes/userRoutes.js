import express from "express";

import {createUser, getAllUsers,deleteUser} from '../controllers/userController.js';

const router = express.Router();

router.post("/",createUser);
router.get('/',getAllUsers);

export default router;