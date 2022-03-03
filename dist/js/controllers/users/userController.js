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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.fieldsVadlidating = exports.resigter = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../../models/user"));
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
exports.getUsers = getUsers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const email = body.email;
        const users = yield user_1.default.find({ email });
        const token = users[0].token;
        const ismatch = yield bcrypt.compare(body.password, users[0].password);
        if (users.length && ismatch) {
            res.status(200).send({
                status: 'success',
                "token": users[0].token
            });
        }
        else {
            res.status(404).send({ status: 'faild' });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const fieldsVadlidating = [
    (0, express_validator_1.check)("email", "invalid email").isEmail(),
    (0, express_validator_1.check)("password", "invalid password").isLength({
        min: 8
    })
];
exports.fieldsVadlidating = fieldsVadlidating;
const resigter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("=========> Called");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const body = req.body;
        console.log({ body });
        const email = body.email;
        const password = yield bcrypt.hash(body.password, 10);
        const token = yield JWT.sign({ email }, process.env.SECRET_KEY, { expiresIn: 900000 });
        const user = new user_1.default({
            email,
            password,
            token,
        });
        const newTodo = yield user.save();
        // console.log({ newTodo: newTodo.toObject() })
        res.status(201).json({
            message: "User added",
            token
        });
    }
    catch (error) {
        throw error;
    }
});
exports.resigter = resigter;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findByIdAndRemove(req.params.id);
        const allusers = yield user_1.default.find();
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
            users: allusers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
