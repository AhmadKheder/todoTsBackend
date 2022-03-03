import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todos";
import UserAuthrization from '../middlewares/userAuthmiddleware';

const router: Router = Router()

router.get("/todos", UserAuthrization, getTodos)

router.post("/add-todo", addTodo)

router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)


export default router;

