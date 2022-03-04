import { Request, Response } from "express";
import Todo from "../../models/todo";
import User from "../../models/user";
import { ITodo } from "./../../types/todo";
import { IUser } from "./../../types/user";

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.findOne({ "token": `${req.headers["user-auth-token"]}` })
        const todos: ITodo[] = await Todo.find({ "userId": `${users._id}` })
        res.status(200).json({ todos } as any)
    } catch (error) {
        throw error;
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "title" | "description" | "status" | "date" | "userId">
        const users: IUser[] = await User.findOne({ "token": `${req.headers["user-auth-token"]}` })

        const todo: ITodo = new Todo({
            userId: users._id,
            title: body.title,
            date: body.date,
            description: body.description,
            status: body.status,
        })
        const newTodo: ITodo = await todo.save();
        res.status(201).json(
            {
                message: "Todo added",
            }
        )

    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { params: { id }, body, } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id }, body)
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo };

