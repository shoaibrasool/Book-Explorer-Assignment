import { Router, Request, Response } from "express";
import { MergeBooks } from "../services/mergeBooksService";

const router = Router()

router.get('/get-books', async (req: Request, res: Response) => {
    try {
        const offset = Number(req.query.offset) || 0
        const books = await MergeBooks(offset)

        return res.status(200).json({
            success: true,
            books: books
        });
    } catch (error) {
        const err = error as Error;

        return res.status(500).json({
            success: false,
            message: "Failed To Fetch Books",
            error: err.message || "Unknown"
        });
    }
})

export default router
