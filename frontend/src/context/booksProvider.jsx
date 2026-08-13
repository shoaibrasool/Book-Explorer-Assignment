import {  useEffect, useState } from 'react';
import { fetchRatedBooksAPI } from '../api/bookService';
import { BooksContext } from './booksContext';

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRatedBooksAPI()
            .then((data) => {
                setBooks(data)
                setLoading(false)
            }).catch((err) => {
                console.error('Error fetching books:', err);
                setLoading(false);
            })

    }, [])

    return(
        <BooksContext.Provider value={{books, loading}}>
            {children}
        </BooksContext.Provider>
    )

}