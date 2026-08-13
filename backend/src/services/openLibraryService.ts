import axios from "axios";

const SUBJECTS = ['fantasy', 'science_fiction', 'mystery', 'romance', 'history', 'biography', 'horror']

export const fetchBooksFromOL = async (offset = 0) => {
    const limit = process.env.MAX_BOOKS || 10
    const page = Math.floor(offset / Number(limit))
    const subject = SUBJECTS[page % SUBJECTS.length]
    const openLibraryUrl = `https://openlibrary.org/search.json?q=subject:${subject}&sort=rating&language=eng&limit=${limit}&offset=${offset}&fields=key,title,author_name,first_publish_year,cover_i,isbn`;

    try {
        const response = await axios.get(openLibraryUrl, {
            timeout: 20000,
            headers: { 'User-Agent': 'BookExplorer/1.0' }
        })
        return response.data?.docs || []
    } catch (error) {
        throw new Error("Could not fetch books from Open Library")
    }

}