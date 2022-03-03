import { Request, Response } from "express";
const JWT = require('jsonwebtoken')
export const UserAuthrization = async (req: Request, res: Response, next: any) => {
    const token = req.header('user-auth-token');
    try {
        let userPayload = await JWT.verify(token, process.env.SECRET_KEY)
        // res.status(200).json({
        //     user: userPayload.email,
        //     msg: "Access Succeed!"
        // })



        
        next();
    } catch (error) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid Token'
                }
            ]
        })
    }
}
module.exports = UserAuthrization;
