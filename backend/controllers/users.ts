import User from "../../models/users/index.js"
import { Request, Response } from "express"
import { userCollection } from "../config/database.js"



//create user
export const registerUser = async( req:Request, res:Response )=>{
    try{
        const { name, email } = req.body
        const existingUser = await User.findByEmail(email)

        if( existingUser ) return res.status(409).json({message:"User already exist"})
        //create user
        await User.create(req.body)
        
        return res.status(201).json("User succcessfully created ")
    }catch(error: any){
        console.log("Error registering user", error)
        return res.status(500).json({
            nessage : "user registration failed",
            error : error.mesaage
        })
    }
}

//get user
export const getAllUser = async( req: Request, res: Response )=>{
    try{
        const collection :any = await userCollection()

        const users = await collection.find().toArray() // makes cursor return all doc

        return res.status(200).json(users)

    }catch(error:any){
        console.log("Error retrieving all users")
        return res.status(500).json({
            message : "Failed retrieving all users",
            error : error.mesaage
        })
    }
}

export const getUser = async( req: Request, res: Response )=>{
    try{
        const { id } = req.params
        // validate id is present
        if (!id){
            return res.status(404).json({
                message : "id not provided"
            })
        }
        const user = await User.findById(id)
        return res.status(200).json(user)
    }catch(error:any){
        console.log("Error retrieving user")
        return res.status(500).json({
            message : "Failed retrieving user",
            error : error.mesaage
        })
    }
}

export const updateProfile = async ( req:Request, res:Response) =>{
    try{
        const { id } = req.params

        if( !id ){
            return res.status(404).json({ message : "id not provided"})
        }
        const { name, email } = req.body
        const response = await User.update(id, req.body)
        
    
        return res.status(201).json({message : "update successful"})
    }catch(error: any){
        console.log("Error updating user's profile", error)
        return res.status(500).json({
            message : "Error updating profile",
            error : error.mesaage
        })
    }
}

export const deleteUser = async ( req:Request, res:Response )=>{
    try{
        const { id } = req.params
        if( !id ){
            return res.status(404).json({ message : "id not provided"})
        }
        const existingUser = await User.findById(id)
        
        if ( !existingUser ) return res.status(404).json({
            message : "user record not found"
        })

        await User.delete(id)
        return res.status(200).json({
            message : "account successfully deleted"
        })
    }catch(error:any){
        console.log("Error deleting user", error)
        return res.status(500).json({
            message : "Error deleting user",
            error : error.message
        })
    }
}