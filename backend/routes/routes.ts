import express from "express";

import { registerUser } from "../controllers/users.js";



const router = express.Router()



router.post("/user/create", registerUser)




export default router