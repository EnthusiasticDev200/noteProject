import { ObjectId } from "mongodb";

export interface IUser{
    id? : ObjectId;
    name : string;
    email : string
    createdAt? : Date
    updatedAt? : Date
}