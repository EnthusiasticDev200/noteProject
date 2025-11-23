import express from "express";

import { 
    deleteUser, getAllUser, getUser, loginUser, 
    logoutUser, 
    registerUser, updateProfile 
} from "../controllers/users.js";
import { authenticateJWT, requireSuperUser } from "../../middleware/auth.js";



const router = express.Router()



router.post("/user/create", registerUser)

router.post("/user/login", loginUser)

router.post("/user/logout", authenticateJWT, logoutUser)

router.get("/user/:id", authenticateJWT, getUser)

router.get("/users/", authenticateJWT, requireSuperUser, getAllUser)

router.put("/user/:id/update", authenticateJWT, updateProfile)

router.delete("/user/:id", authenticateJWT, deleteUser)

export default router