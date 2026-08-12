import axios from 'axios'
import express, { Request, Response } from 'express'

const app = express()

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP"
    })
})

app.get('/get-books', async (req: Request, res: Response) => {
    try {
        const limit = 10
        const openLibraryUrl = `https://openlibrary.org/search.json?q=fiction&limit=${limit}`;

        const response = await axios.get(openLibraryUrl)
        const books = response.data?.docs || [];

        return res.status(200).json({
            success: true,
            data: books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed To Fetch Books",
        });
    }
})

module.exports = app