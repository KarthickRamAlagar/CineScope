import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import HomePage from './pages/HomePage';
import FavoriteMoviesGrid from './components/FavoriteMoviesGrid';
import { Movie } from './types/movieTypes';

const App: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const handleToggleFavorite = (movie: Movie) => {
    setFavoriteMovies((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const handleRemoveFavorite = (movie: Movie) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== movie.id)
    );
  };

  return (
    <ThemeProvider>
      <Router basename="/CineScope"> {/* Add basename here */}
        <div className="flex flex-col min-h-screen">
          <ConditionalNavbar favoriteCount={favoriteMovies.length} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/movies"
                element={
                  <MovieListPage
                    onToggleFavorite={handleToggleFavorite}
                    favoriteMovies={favoriteMovies}
                  />
                }
              />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route
                path="/favorites"
                element={
                  <FavoriteMoviesGrid
                    favoriteMovies={favoriteMovies}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                }
              />
            </Routes>
          </main>
          <ConditionalFooter />
        </div>
      </Router>
    </ThemeProvider>
  );
};

const ConditionalNavbar: React.FC<{ favoriteCount: number }> = ({
  favoriteCount,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return !isHomePage ? <Navbar favoriteCount={favoriteCount} /> : null;
};

const ConditionalFooter: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return !isHomePage ? <Footer /> : null;
};

export default App;