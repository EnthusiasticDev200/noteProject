import { MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const dbName = process.env.MONGODB_NAME!
const uri = process.env.MONGODB_STRING! //local

const db = async() =>{
    const client = new MongoClient(uri)
    try{
        await client.connect()
        console.log('MongoDB connected successfully')
    }catch(error){
        console.error("DB connection failed", error)
    }
    
}

export default db

// try{
//     if (process.env.NODE_ENV === 'development'){
//         const uri = process.env.MONGODB_STRING!
//         client = new MongoClient(uri)
//         client.connect()
//         console.log('MongoDB connected successfully')
//     }
// }catch(error){
//     console.log("DB connection failed", error)
// }

// const db = client?.db('note_project')
// const users = db?.collection("users")
// const orders = db?.collection("orders")
// const notes = db?.collection("notes")
