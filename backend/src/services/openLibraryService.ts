import axios from "axios";

export const fetchBooksFromOL = async () => {
    const limit = process.env.MAX_BOOKS || 10
    const openLibraryUrl = `https://openlibrary.org/search.json?q=has_fulltext:true&sort=rating&limit=${limit}&fields=key,title,author_name,first_publish_year,cover_i,isbn`;

    const response = await axios.get(openLibraryUrl)
    const books = response.data?.docs || [];

    return books
}