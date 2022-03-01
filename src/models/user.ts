import { model, Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<IUser>("User", userSchema)