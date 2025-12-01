import express from "express";

import { 
    deleteUser, getAllUser, getUser, loginUser, 
    logoutUser, 
    registerUser, updateProfile 
} from "../controllers/users.js";

import { authenticateJWT, customerOnly, requireSuperUser } from "../../middleware/auth.js";

import { createNote, deleteNote, getAllNotes, getNote } from "../controllers/notes.js";



const router = express.Router()


// user routes
router.post("/user/create", registerUser)

router.post("/user/login", loginUser)

router.post("/user/logout", authenticateJWT, logoutUser)

router.get("/user", authenticateJWT, getUser)

router.get("/users/", authenticateJWT, requireSuperUser, getAllUser)

router.put("/user/:id/update", authenticateJWT, updateProfile)

router.delete("/user/:id", authenticateJWT, deleteUser)

// note routes

router.post("/note/create", authenticateJWT, customerOnly, createNote)

router.get("/note", authenticateJWT, customerOnly, getNote)

router.get("/notes", authenticateJWT, requireSuperUser, getAllNotes)

router.get("/sample", authenticateJWT, deleteNote)


export default router