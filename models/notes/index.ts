import { ObjectId } from "mongodb";
import { INote } from "./type.js";
import { noteCollection } from "../../backend/config/database.js";


export class Note implements INote{
    _id? :  ObjectId
    userId? : ObjectId;
    content: string;
    createdAt?: Date;
    updateAt?: Date;

    constructor(payload:INote){
        this._id = payload._id ?? new ObjectId()
        this.userId = payload.userId ?? new ObjectId()
        this.content = payload.content 
        this.createdAt = payload.createdAt ?? new Date()
        this.updateAt = payload.updateAt ?? new Date()
    }

    //create
    static async create(userId:string, payload:INote):Promise<Note | null >{
        try{
                const collection:any = await noteCollection()

                const isValidId = ObjectId.isValid(userId)
                if ( !isValidId ) throw new Error ("wants a valid id")

                
                
                // Ensure all fields exist
                payload.userId = new ObjectId(userId) // from jwt

                payload._id = payload._id ?? new ObjectId()
                payload.createdAt = payload.createdAt ?? new Date()

                const note = new Note(payload)

                console.log("payload.userld from Note method", payload.userId)
                    
                const createNote = await collection.insertOne({
                    _id : note._id,
                    userId : note.userId,
                    content : note.content,
                    creatdAt : note.createdAt
                })
                return createNote
        }catch(error:any){
                console.log("error insertng record", error)
                throw new Error("error insertng record")
        }
            
       
    }
    
    // get 
    static async find(userId: string): Promise<Note | null>{

        const isValidId = ObjectId.isValid(userId)        
        if ( !isValidId ) throw new Error("Invalid id")
                
        const collection: any = await noteCollection()
                
        const doc = await collection.findOne(
            { userId : new ObjectId(userId)},
            //projection : exclude : 0, include : 1. NB: 1 & 0 cnt coexist
            { updatedAt : 0 } // removed updatedAt field but include the rest
        )

        return doc ? doc : null
    }

    static async findAll():Promise<Note | null>{
        const collection:any = await noteCollection()

        const doc = await collection.find().toArray()
        return doc ? doc : null
        
    }
    static async update(id:string, data:Partial<INote>): Promise< Note| null>{
        try{
            const isValidId = ObjectId.isValid(id)
            if ( !isValidId ) throw new Error ("invalid id")

            const collection:any = await noteCollection()
            
            data.updateAt = new Date()
            const updateRec = await collection.updateOne(
                {_id : new ObjectId(id)},
                {$set : data}
            )
            return updateRec
            
        }catch(error:any){
            console.log("error updating note", error)
            return error
        }
    }
    static async delete(id:string):Promise<boolean>{
        try{
            const isValidId = ObjectId.isValid(id)
            if( !isValidId) throw new Error("invalid id")
            
            const collection:any = await noteCollection()
            const deleteDoc = await collection.deleteOne({
                _id : new ObjectId(id)
            })
            return deleteDoc.deletedCount > 0
        }catch(error:any){
            console.log('error deleting note', error)
            return error
        }
       
    }

}















































