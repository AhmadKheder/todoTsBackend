import bodyParser from 'body-parser'
import cors from "cors"
import dotenv from 'dotenv'
import express, { Express } from "express"
import mongoose from "mongoose"
import todoRoutes from "./routes"
const auth = require('./routes/auth')
dotenv.config()
export const app: Express = express()
app.use(cors({ origin: true, }))


const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.json())

app.use(todoRoutes)
app.use('/auth', auth)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.f6d5v.mongodb.net/${process.env.MONGO_DB}`

mongoose
    .connect(uri, {})
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        console.log("======>", error)
        throw error;

    })




