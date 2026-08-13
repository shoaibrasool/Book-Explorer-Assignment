import './App.css'
import { useContext } from 'react';
import { BooksContext } from './context/booksContext';

function App() {
  const { books, loading } = useContext(BooksContext);

  if (loading) {
    console.log("Books are loading")
  } else {
    console.log("books", books)
  }

  return (
    <div className='root'>

    </div>
  )
}

export default App
