import { Router, Request, Response } from "express";
import { fetchBooksFromOL } from "../services/openLibraryService";

const router = Router()

router.get('/get-books', async (req: Request, res: Response) => {
    try {
        await fetchBooksFromOL(req, res)
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
