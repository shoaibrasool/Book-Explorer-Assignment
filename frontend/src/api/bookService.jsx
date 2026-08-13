const baseURL = 'http://localhost:4000'

export const fetchRatedBooksAPI = async () => {
    const response = await fetch(`${baseURL}/get-books`)
    const data = await response.json()

    if (data.success) {
        return data.books
    }
    throw new Error(`Failed to fetch books: ${response.statusText}`);
}