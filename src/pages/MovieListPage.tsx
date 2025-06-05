import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MovieCards from '../components/MovieCards';
import { Movie } from '../types/movieTypes';
import { moviesData } from '../utility/moviesData';

interface MovieListPageProps {
  onToggleFavorite: (movie: Movie) => void; 
  favoriteMovies: Movie[]; 
}

const MovieListPage: React.FC<MovieListPageProps> = ({ onToggleFavorite, favoriteMovies }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  const genres = useMemo(() => {
    const allGenres = moviesData.flatMap(movie => movie.genres);
    return ['All Genres', ...Array.from(new Set(allGenres))];
  }, []);

  // Filter movies based on search term and genre
  const filteredMovies = useMemo(() => {
    return moviesData.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           movie.overview.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All Genres' || movie.genres.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredMovies, totalPages]);

  // Get movies for the current page
  const currentMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    return filteredMovies.slice(startIndex, startIndex + moviesPerPage);
  }, [currentPage, filteredMovies]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className={`flex items-center space-x-2 text-sm mb-6 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <Link to="/" className={`${theme === 'dark' ? 'hover:text-amber-400' : 'hover:text-indigo-800'}`}>
            Home
          </Link>
          <span>/</span>
          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Movies</span>
        </div>

        {/* Title */}
        <h1 className={`text-3xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Explore Movies
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-amber-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-amber-400' 
                : 'border focus:ring-indigo-500'
            }`}
          />
        </div>

        {/* Movie Grid */}
        {currentMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              No movies found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieCards
                    movie={movie}
                    onToggleFavorite={onToggleFavorite} 
                    isFavorite={favoriteMovies.some((fav) => fav.id === movie.id)} 
                  />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'border-gray-600 text-gray-300 disabled:opacity-50' 
                      : 'border disabled:opacity-50'
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === number
                        ? 'bg-amber-500 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-200'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'border-gray-600 text-gray-300 disabled:opacity-50' 
                      : 'border disabled:opacity-50'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;