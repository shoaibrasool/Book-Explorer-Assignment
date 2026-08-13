import { useCallback, useEffect, useState } from 'react';
import { fetchRatedBooksAPI } from '../api/bookService';
import { BooksContext } from './booksContext';

const PAGE_SIZE = 8;

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const refetch = useCallback(() => {
        fetchRatedBooksAPI(0)
            .then((data) => {
                setBooks(data)
                setHasMore(data.length === PAGE_SIZE)
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

    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);

        fetchRatedBooksAPI(books.length)
            .then((data) => {
                setBooks((prevBooks) => [...prevBooks, ...data])
                setHasMore(data.length === PAGE_SIZE)
                setLoadingMore(false)
            }).catch((err) => {
                console.error('Error loading more books:', err);
                setLoadingMore(false);
            })
    }, [loadingMore, hasMore, books.length])

    return (
        <BooksContext.Provider value={{ books, loading, error, refetch: handleRetry, loadingMore, hasMore, loadMore }}>
            {children}
        </BooksContext.Provider>
    )
}