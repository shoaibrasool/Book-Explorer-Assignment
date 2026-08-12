import axios from "axios";
import { Request, Response } from "express";

export const fetchBooksFromOL = async (req: Request, res: Response) => {
    const limit = 10
    const openLibraryUrl = `https://openlibrary.org/search.json?q=fiction&limit=${limit}`;

    const response = await axios.get(openLibraryUrl)
    const books = response.data?.docs || [];

    return res.status(200).json({
        success: true,
        data: books,
    });
}