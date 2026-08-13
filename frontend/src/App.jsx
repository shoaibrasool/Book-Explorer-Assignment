import './App.css';
import { useContext } from 'react';
import { Book } from './components/Book';
import { BooksContext } from './context/booksContext';

function App() {
  const { books, loading } = useContext(BooksContext);

  if (loading) {
    return <h2 className="statusMessage">Loading books...</h2>;
  }

  return (
    <main className="container">
      <h1 className="heading">Book Library</h1>

      {books.length === 0 ? (
        <p className="statusMessage">No books found.</p>
      ) : (
        <div className="grid">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;