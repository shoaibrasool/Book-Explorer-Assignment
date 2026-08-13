# Book Explorer

A full-stack web application that lets users browse a library of books and see their ratings. The backend fetches books from the Open Library API, looks up ratings from the Google Books API, and merges everything into a single clean endpoint. The frontend consumes that endpoint and displays the books in a responsive grid.

## Tech Stack

**Backend**
- Node.js + Express
- TypeScript
- Axios

**Frontend**
- React (with Vite)
- Plain CSS (no UI library)

## How It Works

1. The frontend calls `GET /get-books?offset=0` on the backend.
2. The backend queries the Open Library API for books. It rotates through a few subjects (fantasy, science fiction, mystery, etc.) as you load more pages, so the results stay varied. Books are sorted by rating on Open Library's side.
3. For each book, the backend searches the Google Books API for a rating. It tries a title + author query first, then an ISBN query, and finally a plain title query as a fallback.
4. The merged book data (title, authors, cover, publish year, rating) is returned as JSON. Results are cached in memory for 30 minutes so repeat requests don't hit the external APIs again.

## Project Structure

```
backend/
  src/
    routes/router.ts          # API endpoint
    services/                 # Open Library + Google Books calls, merge logic
    utils/                    # cache and small helpers
    types/types.ts            # shared interfaces
    app.ts, server.ts         # express setup and entry point
  .env.example

frontend/
  src/
    api/bookService.jsx       # API calls + localStorage caching
    context/                  # books state shared across components
    components/               # Book card, skeleton loader
    App.jsx, main.jsx
```

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The server runs on `http://localhost:4000`.

Open `.env` and add your Google Books API key:

```
GOOGLE_BOOKS_API_KEY=your_key_here
```

> **Note:** The key is optional. Without it the app still works — books just won't have ratings. You can get a free key from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials). You can also set `MAX_BOOKS` in `.env` to control how many books are fetched per request (default is 8).

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API

**`GET /get-books?offset=0`**

| Param  | Type   | Description                          |
| ------ | ------ | ------------------------------------ |
| offset | number | Number of books to skip (pagination) |

Response:

```json
{
  "success": true,
  "books": [
    {
      "id": "/works/OL1234567W",
      "title": "Example Book",
      "authors": ["Some Author"],
      "firstPublishYear": 1999,
      "coverImage": "https://covers.openlibrary.org/b/id/12345-M.jpg",
      "isbn": "9781234567890",
      "averageRating": 4.2
    }
  ]
}
```

`averageRating` is `null` when no rating could be found.

There is also a `GET /health` endpoint that returns `{ "status": "UP" }`.

## Features

- Responsive book grid with cover images and star ratings
- Search by title or author (instant, client-side)
- Infinite scroll pagination
- Skeleton loading cards while fetching
- Error state with a retry button
- Server-side in-memory caching (30 min TTL)
- Client-side localStorage caching (30 min TTL)

## Notes / Limitations

- Ratings depend on the Google Books API key, and some books simply don't have ratings on Google Books — those show "No rating".
- Not every book in Open Library has a cover, so a placeholder is shown in that case.
- The backend cache is in-memory, so it resets whenever the server restarts.
- Infinite scroll stops once the API stops returning full pages (i.e., the end of the available data).