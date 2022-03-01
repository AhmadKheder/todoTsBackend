"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthrization = void 0;
const JWT = require('jsonwebtoken');
const UserAuthrization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('user-auth-token');
    try {
        let userPayload = yield JWT.verify(token, process.env.SECRET_KEY);
        // res.status(200).json({
        //     user: userPayload.email,
        //     msg: "Access Succeed!"
        // })
        next();
    }
    catch (error) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid Token'
                }
            ]
        });
    }
});
exports.UserAuthrization = UserAuthrization;
module.exports = exports.UserAuthrization;
