import { useCallback, useEffect, useState } from 'react';
import { fetchRatedBooksAPI } from '../api/bookService';
import { BooksContext } from './booksContext';

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const refetch = useCallback(() => {
        fetchRatedBooksAPI()
            .then((data) => {
                setBooks(data)
                setLoading(false)
            }).catch((err) => {
                console.error('Error fetching books:', err);
                setError(true);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        refetch()
    }, [refetch])

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        refetch();
    }

    return (
        <BooksContext.Provider value={{ books, loading, error, refetch: handleRetry }}>
            {children}
        </BooksContext.Provider>
    )
}