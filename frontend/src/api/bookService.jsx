const baseURL = 'http://localhost:4000'

export const fetchRatedBooksAPI = async (offset = 0) => {
    const response = await fetch(`${baseURL}/get-books?offset=${offset}`)
    const data = await response.json()

    if (data.success) {
        return data.books
    }
    throw new Error(`Failed to fetch books: ${response.statusText}`);
}