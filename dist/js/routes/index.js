"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const userAuthmiddleware_1 = __importDefault(require("../middlewares/userAuthmiddleware"));
const router = (0, express_1.Router)();
router.get("/todos", userAuthmiddleware_1.default, todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
router.put("/edit-todo/:id", todos_1.updateTodo);
router.delete("/delete-todo/:id", todos_1.deleteTodo);
exports.default = router;
