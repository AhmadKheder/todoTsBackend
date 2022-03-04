import { Document } from "mongoose";

export interface ITodo extends Document {
    userId: string
    title: string
    date: string
    description: string
    status: boolean
}