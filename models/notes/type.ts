import { ObjectId } from "mongodb";


export interface INote{
    _id? : ObjectId
    userId? : ObjectId
    content : string
    createdAt? : Date
    updateAt? : Date
}