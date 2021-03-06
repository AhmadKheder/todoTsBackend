import { model, Schema } from "mongoose"
import { ITodo } from "../types/todo"

const todoSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

export default model<ITodo>("todo", todoSchema)
