import express from "express";

import { deleteUser, getAllUser, getUser, registerUser, updateProfile } from "../controllers/users.js";



const router = express.Router()



router.post("/user/create", registerUser)

router.get("/user/:id", getUser)

router.get("/users/", getAllUser)

router.put("/user/:id/update", updateProfile)

router.delete("/user/:id", deleteUser)

export default router