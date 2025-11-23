import { ObjectId } from "mongodb";
import { userCollection } from "../../backend/config/database.js"
import type { IUser } from './type.js';



class User implements IUser{
    id? :  ObjectId
    name : string
    email : string
    role : string
    createdAt? : Date
    updatedAt?: Date;

    constructor(payload:IUser){
        this.id = payload.id ?? new ObjectId()
        this.name = payload.name
        this.email = payload.email
        this.role = payload.role
        this.createdAt = payload.createdAt ??new Date()
        this.updatedAt = payload.updatedAt ?? new Date()
    }


     //create
    static async create(payload: IUser): Promise< User | null> {
        const collection: any = await userCollection()

        const user = new User(payload)
        const createUSer = await collection.insertOne({
            _id : user.id,
            name : user.name,
            email : user.email,
            role : user.role,
            createdAt : user.createdAt
        })
        return createUSer
    }

    // get
    static async findByEmail(value : string) :Promise<User | null >{
        
        const isEmail = value.includes("@")
        console.log('isEmail', isEmail)

        if ( !isEmail ) throw new Error("Invalid email")
        
        const collection:any = await userCollection() 

        const  doc = await collection.findOne({email:value}) 
        return doc ? new User({_id : doc._id, ...doc }) : null
        
    }
   
    static async findById (id: string):Promise<User | null>{

        const isValidId = ObjectId.isValid(id)        
        if ( !isValidId ) throw new Error("Invalid id")
        
        const collection: any = await userCollection()
        
        const doc = await collection.findOne({ _id : new ObjectId(id)})
        return doc ? new User({ _id : doc._id, ...doc}) : null
    }

    static async findAll():Promise<any>{
        const collection: any = await userCollection()
        const response = await collection.find().toArray() // makes cursor return all doc
        return response ? response : null
    }
    // update
    static async update(id : string, data : Partial<IUser>): Promise<boolean>{
        
        const isValidId = ObjectId.isValid(id)
        if ( !isValidId ) throw new Error("invalid id")

        const collection: any = await userCollection()
        data.updatedAt = new Date()
        const updateRecord = await collection.updateOne(
            { _id : new ObjectId(id) },
            { $set : data}   
        )
       
        return updateRecord.modifiedCount > 0
    }

    //delete
    static async delete(id:string): Promise<boolean>{
        const collection:any = await userCollection()

        const result = await collection.deleteOne(
            {_id : new ObjectId(id)}
        ) 

        return result.deletedCount > 0
    }

}


export default User