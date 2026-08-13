const baseURL = 'http://localhost:4000'
const CACHE_TTL_MS = 30 * 60 * 1000;

const loadFromStorage = (offset) => {
    const cached = localStorage.getItem(`books-v2-${offset}`);
    if (!cached) return null;

    const { books, savedAt } = JSON.parse(cached);
    if (Date.now() - savedAt > CACHE_TTL_MS) {
        localStorage.removeItem(`books-v2-${offset}`);
        return null;
    }
    return books;
};

const saveToStorage = (offset, books) => {
    localStorage.setItem(`books-v2-${offset}`, JSON.stringify({
        books,
        savedAt: Date.now(),
    }));
};

export const fetchRatedBooksAPI = async (offset = 0) => {
    const cachedBooks = loadFromStorage(offset);
    if (cachedBooks) return cachedBooks;

    const response = await fetch(`${baseURL}/get-books?offset=${offset}`)
    const data = await response.json()

    if (data.success) {
        saveToStorage(offset, data.books);
        return data.books
    }
    throw new Error(`Failed to fetch books: ${response.statusText}`);
}