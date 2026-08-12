import express, { Request, Response } from 'express'
import router from './routes/router'

const app = express()

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP"
    })
})

app.use("/", router)

module.exports = app