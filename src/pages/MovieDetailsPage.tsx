import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { moviesData } from "../utility/moviesData";
import { Movie } from "../types/movieTypes";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const movieId = parseInt(id || "", 10);
    const foundMovie = moviesData.find((m) => m.id === movieId);

    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  if (!movie) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: theme === "dark" ? "#111827" : "#F3F4F6",
          color: theme === "dark" ? "#FFFFFF" : "#111827",
        }}
      >
        <div className="text-xl">Loading movie details...</div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % movie.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + movie.images.length) % movie.images.length
    );
  };

  const relatedMovies = moviesData
    .filter((m) => m.id !== movie.id && m.genres[0] === movie.genres[0])
    .slice(0, 4);

  return (
    <>
      <style>{`
        :root {
          --color-bg-light: #F3F4F6;
          --color-bg-dark: #111827;
          --color-text-light: #111827;
          --color-text-dark: #FFFFFF;
          --color-text-secondary-light: #6B7280;
          --color-text-secondary-dark: #9CA3AF;
          --color-primary: #4F46E5;
          --color-star-yellow: #FBBF24;
        }
      `}</style>
      <div
        className="min-h-screen"
        style={{
          backgroundColor:
            theme === "dark" ? "var(--color-bg-dark)" : "var(--color-bg-light)",
          color:
            theme === "dark"
              ? "var(--color-text-dark)"
              : "var(--color-text-light)",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div
            className="text-sm mb-4"
            style={{
              color:
                theme === "dark"
                  ? "var(--color-text-secondary-dark)"
                  : "var(--color-text-secondary-light)",
            }}
          >
            <button
              onClick={() => navigate("/")}
              className="hover:text-primary"
              style={{ color: "inherit" }}
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <span
              className="font-medium"
              style={{ color: theme === "dark" ? "white" : "black" }}
            >
              {movie.title}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{movie.title}</h1>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Image Carousel */}
            <div
              className="md:w-1/2 rounded-xl bg-gray-100 p-4 shadow-md h-96" 
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#f3f4f6",
              }}
            >
              <div className="relative rounded-xl overflow-hidden h-full">
                {" "}
                <img
                  src={movie.images[currentImageIndex]}
                  alt={`${movie.title} image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover" 
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  aria-label="Previous Image"
                >
                  ❮
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  aria-label="Next Image"
                >
                  ❯
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {movie.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex
                          ? "bg-primary"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Movie Info */}
            <div
              className="md:w-1/2 bg-white rounded-xl shadow-md p-6"
              style={{
                backgroundColor: theme === "dark" ? "#374151" : "#ffffff", 
                color: theme === "dark" ? "#f9fafb" : "#111827", 
              }}
            >
              <div className="flex flex-wrap gap-4 items-center text-lg font-medium mb-4">
                <span
                  className="flex items-center"
                  style={{ color: "var(--color-star-yellow)" }}
                >
                  ★
                  <span
                    className="ml-1"
                    style={{
                      color:
                        theme === "dark"
                          ? "var(--color-text-secondary-dark)"
                          : "var(--color-text-secondary-light)",
                    }}
                  >
                    {movie.vote_average.toFixed(1)}
                  </span>
                </span>
                <span>|</span>
                <span>{movie.runtime} mins</span>
                <span>|</span>
                <span>{movie.release_date}</span>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <p
                  className="text-base"
                  style={
                    expanded
                      ? {}
                      : {
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }
                  }
                >
                  {movie.overview}
                </p>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-primary mt-2 hover:underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  {expanded ? "Show Less" : "Show More"}
                </button>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
                style={{ color: theme === "dark" ? "#d1d5db" : "#1f2937" }}
              >
                <div>
                  <h3 className="text-lg font-semibold">Directors</h3>
                  <p>{movie.directors.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Producers</h3>
                  <p>{movie.producers.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Cast</h3>
                  <p>{movie.cast.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Genres</h3>
                  <p>{movie.genres.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>

          {relatedMovies.length > 0 && (
            <div className="mt-16">
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: theme === "dark" ? "white" : "black" }}
              >
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedMovies.map((relatedMovie) => (
                  <div
                    key={relatedMovie.id}
                    className="cursor-pointer group"
                    onClick={() => navigate(`/movie/${relatedMovie.id}`)}
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={relatedMovie.poster_path}
                        alt={relatedMovie.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3
                      className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {relatedMovie.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
