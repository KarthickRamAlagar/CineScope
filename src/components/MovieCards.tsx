import React from "react";
import { Movie } from "../types/movieTypes";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface MovieCardsProps {
  movie: Movie;
  onToggleFavorite: (movie: Movie) => void;
  isFavorite: boolean;
}

const MovieCards: React.FC<MovieCardsProps> = ({ movie, onToggleFavorite, isFavorite }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/movie/${movie.id}`}>
        <div className="h-64 overflow-hidden">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover center hover:scale-105 transition-transform translate-y-0"
          />
        </div>
      </Link>

      {/* Favorite Heart Button */}
      <button
        onClick={() => onToggleFavorite(movie)}
        className="absolute top-2 left-2 bg-white/80 p-1 rounded-full hover:bg-red-100 transition-colors shadow-md"
      >
        {isFavorite ? (
          <HeartSolid className="h-6 w-6 text-red-500" /> 
        ) : (
          <HeartOutline className="h-6 w-6 text-gray-800" /> 
        )}
      </button>

      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-indigo-800 truncate transition-colors">
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center mb-1">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-gray-700">{movie.vote_average.toFixed(1)}</span>
        </div>

        <p className="text-sm text-gray-500 truncate">
          {movie.genres?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCards;