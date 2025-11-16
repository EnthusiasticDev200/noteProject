import express from "express"
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import { allowedOrigin } from "./backend/config/cors.js"
import appRoutes from "./backend/routes/routes.js"


dotenv.config()


const app = express()

const server = http.createServer(app)


app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin : function(origin, callback){
        if ( !origin || allowedOrigin.includes(origin)){
            return callback(null, true)
        }else{
            return callback(new Error("Not allowed by CORS"))
        }
    },
    methods : ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials : true 
}))


app.use('/api', appRoutes )


const PORT = process.env.APP_PORT

server.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})

//LANDING PAGE 
app.get('/', (req, res)=>{
    res.send("Welcome to NoteKeeping App")
})

app.use('',(req, res)=>{
    res.status(404).json({message : 'Route not found'})
})






