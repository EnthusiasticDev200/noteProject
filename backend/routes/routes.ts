import express from "express";

import { 
    deleteUser, getAllUser, getUser, loginUser, 
    registerUser, updateProfile 
} from "../controllers/users.js";
import { authenticateJWT } from "../../middleware/auth.js";



const router = express.Router()



router.post("/user/create", registerUser)

router.post("/user/login", loginUser)

router.get("/user/:id", getUser)

router.get("/users/", getAllUser)

router.put("/user/:id/update", updateProfile)

router.delete("/user/:id", deleteUser)

export default router