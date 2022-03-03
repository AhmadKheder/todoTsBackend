"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const userController_1 = require("../controllers/users/userController");
const userAuthmiddleware_1 = __importDefault(require("../middlewares/userAuthmiddleware"));
router.get("/users", userAuthmiddleware_1.default, userController_1.getUsers);
//  fieldsVadlidating,
router.post("/register", userController_1.fieldsVadlidating, userController_1.resigter);
router.post("/login", userController_1.login);
router.delete("/delete-user/:id", userController_1.deleteUser);
module.exports = router;
