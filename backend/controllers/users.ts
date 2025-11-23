import User from "../../models/users/index.js"
import { Request, Response } from "express"
import { userCollection } from "../config/database.js"
import { accessToken } from "../../services/createToken.js"



const envState = process.env.NODE_ENV!
console.log('envState', envState)

//create user
export const registerUser = async( req:Request, res:Response )=>{
    try{
        const { name, email, role } = req.body

        if ( !name || !email || !role ){
            return res.status(400).json({
                message : "field requires"
            })
        }
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

//login logic
export const loginUser = async ( req: Request, res : Response) =>{
    try{
        const { name, email } = req.body

        console.log("reqBody" , req.body)
        const user = await User.findByEmail(email)

        console.log("userLogin", user)

        if ( !user ){
            return res.status(404).json({ message: 'user not found' })
        }

        if (user.name !== name && user.email !== email){
            return res.status(401).json({
                message : "ops!!"
            })
        }

        // create payload
        const payload = {
            userId : user.id,
            name : user.name,
            email : user.email,
            role : user.role
        }
        console.log('payload', payload)
        //create jwt
        const userToken = accessToken(payload)

        console.log("userToken", userToken)

        res.cookie('user_token', userToken, {
            httpOnly : true,
            secure : envState === 'production',
            sameSite: envState === 'production' ? 'none' : 'lax',
            maxAge : 5 * 60 * 1000
        })
        return res.status(200).json({
            message : `Welcome ${name}`
        })
    }catch(error: any){
        console.log("User login failed", error)
        return res.status(500).json({
            message : "User login failed",
            error : error.message
        })
    }
}
