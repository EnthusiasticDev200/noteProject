import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv'
import { Response, Request, NextFunction } from "express"

dotenv.config()

interface customJwtPayload extends JwtPayload{
    userId : string
    name : string
    email : string
    role : string
}

const authenticateJWT = ( req : Request, res : Response, next : NextFunction) =>{
    console.log("cookies", req.cookies)
    const token = req.cookies.user_token

    console.log("tokenFROMauthMid", token)

    if ( !token ) return res.status(401).json({
        message : "Invalid or expired token"
    })

    try{
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET!,
            { algorithms : ['HS256']} 
        ) as customJwtPayload;

        console.log('decoded', decoded)
        req.userld = decoded.userId
        req.name = decoded.name
        req.email = decoded.email
        req.role = decoded.role
        
        next()
    }catch(error:any){
        console.log('JWT verification failed', error)
        return res.status(500).json({
            error : error.message
        })
    }
}



export { authenticateJWT }