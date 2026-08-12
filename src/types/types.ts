export interface Book {
  key: string;
  title: string;
  authors?: string[];
  author_name?: string[];
  first_publish_year: number;
  isbn: string[];
  cover_i: number;
}

export interface RatedBook {
  id: string;
  title: string;
  authors: string[];
  firstPublishYear: number | null;
  coverImage: string | null;
  isbn: string | null;
  rating: number | null;
}