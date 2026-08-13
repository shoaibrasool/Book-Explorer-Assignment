import './App.css';
import { useContext, useState } from 'react';
import { Book } from './components/Book';
import { SkeletonCard } from './components/SkeletonCard';
import { BooksContext } from './context/booksContext';

function App() {
  const { books, loading, error, refetch } = useContext(BooksContext);
  const [query, setQuery] = useState('');

  const search = query.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const title = book.title.toLowerCase();
    const authors = (book.authors || []).join(' ').toLowerCase();
    return title.includes(search) || authors.includes(search);
  });

  return (
    <main className="page">
      <header className="header">
        <h1 className="heading">Book Explorer</h1>
        <p className="tagline">Browse a curated library of books and their ratings</p>
      </header>

      <section className="container">
        {loading ? (
          <div className="grid">
            {Array.from({ length: 8 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="searchBar">
              <input
                type="text"
                className="searchInput"
                placeholder="Search by title or author..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {error ? (
              <div className="errorBox">
                <p className="errorText">
                  Something went wrong while loading the books.
                </p>
                <button className="retryButton" onClick={refetch}>
                  Try again
                </button>
              </div>
            ) : filteredBooks.length === 0 ? (
              <p className="statusMessage">
                {books.length === 0
                  ? 'No books found.'
                  : 'No books match your search.'}
              </p>
            ) : (
              <div className="grid">
                {filteredBooks.map((book) => (
                  <Book key={book.id} book={book} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <footer className="footer">
        <p>Powered by the Open Library and Google Books APIs</p>
      </footer>
    </main>
  );
}

export default App;