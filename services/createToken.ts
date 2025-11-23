import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()


const accessToken = (payload : object )=> {
    const tokem = jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        { 
            algorithm : 'HS256', // ['H256'] wrong, HS256 coorect
            expiresIn : '5m'
        }
    )
    return tokem
}

const refreshToken = (payload : object) =>{
    const token = jwt.sign(
        payload,
        process.env.REFRESH_JWT_SECRET!,
        {
            algorithm : "HS256",
            expiresIn : "24h"
        }
    )
    return token
}


export { accessToken, refreshToken }

