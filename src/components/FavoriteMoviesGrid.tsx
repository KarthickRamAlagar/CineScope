import React from "react";
import { Link } from "react-router-dom";
import MovieCards from "./MovieCards";
import { Movie } from "../types/movieTypes";
import { HeartIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface FavoriteMoviesGridProps {
  favoriteMovies: Movie[];
  onRemoveFavorite: (movie: Movie) => void;
}

const FavoriteMoviesGrid: React.FC<FavoriteMoviesGridProps> = ({ favoriteMovies, onRemoveFavorite }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      {favoriteMovies.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Your favorites list is empty</h3>
          <p className="mt-1 text-gray-500">Start exploring movies to add them to your favorites</p>
          <div className="mt-6">
            <Link 
              to="/movies" 
              className="inline-flex items-center px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900 transition-colors"
            >
              <ArrowRightIcon className="h-5 w-5 mr-2 -rotate-180" />
              Explore Movies
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <MovieCards
                movie={movie}
                onToggleFavorite={onRemoveFavorite} 
                isFavorite={true} 
              />
              {/* Remove Button positioned at the bottom-right corner */}
              <button
                onClick={() => onRemoveFavorite(movie)}
                className="absolute bottom-2 right-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviesGrid;