import { Request, Response } from "express";
import Todo from "../../models/todo";
import { ITodo } from "./../../types/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find({})
        res.status(200).json({ todos } as any)
    } catch (error) {
        throw error;
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {

        const body = req.body as Pick<ITodo, "title" | "description" | "status" | "date">
        const todo: ITodo = new Todo({
            title: body.title,
            date: body.date,
            description: body.description,
            status: body.status,
        })
        const newTodo: ITodo = await todo.save();
        // console.log({ newTodo: newTodo.toObject() })

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