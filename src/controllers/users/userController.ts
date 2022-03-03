import { Request, Response } from "express";
import { check, validationResult } from 'express-validator';
import User from "../../models/user";
import { IUser } from "./../../types/user";
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find({})
        res.status(200).json({ users } as any)
    } catch (error) {
        throw error;
    }
}
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "email" | "password" | "token">
        const email = body.email;
        const users: IUser[] = await User.find({ email })
        const token = users[0].token;

        const ismatch = await bcrypt.compare(body.password, users[0].password);

        if (users.length && ismatch) {
            res.status(200).send({
                status: 'success',
                "token": users[0].token
            })
        } else {
            res.status(404).send({ status: 'faild' })
        }

    } catch (error) {
        throw error;
    }
}

const fieldsVadlidating =
    [
        check("email", "invalid email").isEmail(),
        check("password", "invalid password").isLength({
            min: 8
        })
    ]

const resigter = async (req: Request, res: Response): Promise<void | any> => {
    try {

        console.log("=========> Called")


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const body = req.body as Pick<IUser, "email" | "password">

        console.log({ body })


        const email = body.email;
        const password = await bcrypt.hash(body.password, 10)

        const token = await JWT.sign(
            { email },
            process.env.SECRET_KEY,
            { expiresIn: 900000 }
        )
        const user: IUser = new User({
            email,
            password,
            token,

        })
        const newTodo: IUser = await user.save();
        // console.log({ newTodo: newTodo.toObject() })


        res.status(201).json(
            {
                message: "User added",
                token
            }
        )

    } catch (error) {
        throw error
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findByIdAndRemove(
            req.params.id
        )
        const allusers: IUser[] = await User.find()
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
            users: allusers,
        })
    } catch (error) {
        throw error
    }
}
export { getUsers, resigter, fieldsVadlidating, deleteUser, login };

