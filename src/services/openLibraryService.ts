import axios from "axios";

export const fetchBooksFromOL = async () => {
    const limit = process.env.MAXBOOKS || 10
    const openLibraryUrl = `https://openlibrary.org/search.json?q=has_fulltext:true&limit=${limit}`;

    const response = await axios.get(openLibraryUrl)
    const books = response.data?.docs || [];

    return books
}