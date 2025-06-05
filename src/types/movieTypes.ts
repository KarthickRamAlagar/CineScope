export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  genres: string[];
  vote_average: number;
  popularity: number;
  overview: string;
  images: string[];
  directors: string[];
  producers: string[];
  cast: string[];
  runtime: number;
  release_date: string;
}