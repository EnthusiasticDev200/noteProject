import { MongoClient, Db, Collection} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const dbName = process.env.MONGODB_NAME!

const uri = process.env.MONGODB_STRING! //local

let db : Db
let client : MongoClient

export const connectDb = async() =>{
    try{
        if (db) return db // halt reconnection
        client = new MongoClient(uri)
        
        await client.connect()
        console.log('MongoDB connected successfully')

        db = client.db(dbName)
    }catch(error){
        console.error("DB connection failed", error)
    }
    return db
}

// create collection

export const userCollection = async() =>{
    const database = await connectDb()
    return database.collection("users") // create user's collection
}


export const notesCollection = async() =>{
    const database = await connectDb()
    return database.collection("notes") // create note's collection
}


export const ordersCollection = async() =>{
    const database = await connectDb()
    return database.collection("orders") // create orders's collection
    
}

