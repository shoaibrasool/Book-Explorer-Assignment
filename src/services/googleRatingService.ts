import axios from "axios";
import { Book } from "../types/types";
import { sanitizeAuthor } from "../utils/helper";

export const fetchGoogleRating = async (book: Book) => {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) return null;

    const rawAuthor = book.authors?.[0] || "";
    const cleanAuthor = sanitizeAuthor(rawAuthor);
    const cleanTitle = book.title.replace(/[^\w\s]/gi, " ").replace(/\s+/g, " ").trim();

    const getRatingFromQuery = async (query: string) => {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;
            const response = await axios.get(url, { timeout: 4000 });
            const items = response.data?.items || [];

            for (const item of items) {
                const rating = item?.volumeInfo?.averageRating;
                if (typeof rating === "number") {
                    return rating;
                }
            }
        } catch {
        }
        return null;
    };

    if (cleanAuthor && cleanAuthor.toLowerCase() !== cleanTitle.toLowerCase()) {
        const rating = await getRatingFromQuery(`${cleanTitle} ${cleanAuthor}`);
        if (rating !== null) return rating;
    }

    if (book.isbn) {
        const rating = await getRatingFromQuery(`isbn:${book.isbn}`);
        if (rating !== null) return rating;
    }

    const fallbackRating = await getRatingFromQuery(cleanTitle);
    if (fallbackRating !== null) return fallbackRating;

    console.warn(`[GOOGLE BOOKS] Could not fetch rating for: "${book.title}"`);
    return null;
};