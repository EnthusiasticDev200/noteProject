import { ObjectId } from "mongodb";
import { Note } from "../../models/notes/index.js";
import { Request, Response } from "express"





export const createNote = async ( req: Request, res: Response )=>{
    const userId  = req.userld!

    const { content } = req.body

    if( !content ){
        return res.status(400).json({message : "content can't be empty"})
    }

    try{
        //create note
        await Note.create( userId, { content } )
    
        return res.status(201).json({ message : "note created"})
    }catch(error:any){
        console.log("error creating note", error.stack)
        return res.status(500).json({
            message : "fialed creating note",
            error : error.message
        })
    }
}

export const getNote = async ( req:Request, res: Response) =>{
    const userId = req.userld!

    const myNote = await Note.find(userId)

    if ( !myNote || myNote === null){
        return res.status(404).json({ message : "Note not found"})
    }
    return res.status(200).json(myNote)
}

export const getAllNotes = async ( req: Request, res: Response)=>{
    const notes = await Note.findAll()

    return res.status(200).json(notes)
}