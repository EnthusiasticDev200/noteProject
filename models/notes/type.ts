import { ObjectId } from "mongodb";


export interface INote{
    id : ObjectId
    userId : ObjectId
    content : string
    createdAt : Date
    updateAt? : Date
}