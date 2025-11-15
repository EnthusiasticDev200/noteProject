import User from "../../models/users/index.js"
import { Request, Response } from "express"


//create user
export const registerUser = async( req:Request, res:Response )=>{
    try{
        const { name, email } = req.body
        const existingUser = await User.find(email)

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