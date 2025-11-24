import { ObjectId } from "mongodb";
import { INote } from "./type.js";
import { noteCollection } from "../../backend/config/database.js";


class Note implements INote{
    id :  ObjectId
    userId: ObjectId;
    content: string;
    createdAt: Date;
    updateAt?: Date;

    constructor(payload:any){
        this.id = payload.id ?? new ObjectId
        this.userId = payload.userId
        this.content = payload.content 
        this.createdAt = payload.createAt ?? new Date()
        this.updateAt = payload.updateAt ?? new Date()
    }

    //create
    static async create(payload:INote):Promise<Note | null >{
        const collection:any = await noteCollection()

        const note = new Note(payload)
        let createNote
        try{
                createNote = await collection.insertOne({
                _id : note.id,
                userId : note.userId,
                content : note.content,
                creatdAt : note.createdAt
            })
        }catch(error:any){
            console.log("error insertng record", error)
            throw new Error("error insertng record")
        }
        
        return createNote
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















































