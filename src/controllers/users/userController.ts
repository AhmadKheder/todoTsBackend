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
        const body = req.body as Pick<IUser, "email" | "password">
        const email = body.email;
        const users: IUser[] = await User.find({ email })
        const tokenX = req.header('user-auth-token');



        if (!users.length) {

            await res.status(404).send({ status: 'faild' })
            return
        }


        const token = users[0].token;

        const isMatch = await bcrypt.compare(body.password, users[0].password);

        if (users.length && isMatch) {
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

const fieldsValidation =
    [
        check("email", "invalid email").isEmail(),
        check("password", "invalid password").isLength({
            min: 8
        })
    ]




const resigter = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const body = req.body as Pick<IUser, "email" | "password">
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
        await user.save();

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
        await User.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: "User deleted", })
    } catch (error) {
        throw error
    }
}
export { getUsers, resigter, fieldsValidation as fieldsVadlidating, deleteUser, login };

