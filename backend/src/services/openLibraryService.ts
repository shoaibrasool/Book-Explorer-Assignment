import axios from "axios";

export const fetchBooksFromOL = async (offset = 0) => {
    const limit = process.env.MAX_BOOKS || 10
    const openLibraryUrl = `https://openlibrary.org/search.json?q=has_fulltext:true&sort=rating&language=eng&limit=${limit}&offset=${offset}&fields=key,title,author_name,first_publish_year,cover_i,isbn`;

    try {
        const response = await axios.get(openLibraryUrl)
        return response.data?.docs || []
    } catch (error) {
        throw new Error("Could not fetch books from Open Library")
    }

}