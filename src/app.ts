import express, { Request, Response } from 'express'
import router from './routes/router'
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP"
    })
})

app.use("/", router)

module.exports = app