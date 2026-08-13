import { Book, RatedBook } from "../types/types";
import { fetchGoogleRating } from "./googleRatingService";
import { fetchBooksFromOL } from "./openLibraryService";

export const MergeBooks = async (offset = 0) => {
    const rawBooks = await fetchBooksFromOL(offset)

    const mergedBooks: RatedBook[] = await Promise.all(
        rawBooks.map(async (book: Book) => {
            const bookRating = await fetchGoogleRating(book)
            return {
                id: book.key,
                title: book.title,
                authors: book.author_name || ["Unknown Author"],
                firstPublishYear: book.first_publish_year || null,
                coverImage: book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : null,
                isbn: book.isbn?.[0] || null,
                averageRating: bookRating,
            };
        })
    )
    return mergedBooks
}