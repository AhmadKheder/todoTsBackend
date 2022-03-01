import { Document } from "mongoose";

export interface ITodo extends Document {
    title: string
    date: string
    description: string
    status: boolean
}