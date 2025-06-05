import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon, UserIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface NavbarProps {
  favoriteCount: number; 
}

const Navbar: React.FC<NavbarProps> = ({ favoriteCount }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav
        className={`sticky top-0 z-10 py-4 shadow-md ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CS</span>
            </div>
            <span
              className={`font-semibold text-xl ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              CineScope
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Profile Icon */}
            <Link
              to="/favorites"
              className={`relative p-2 rounded-full transition-colors ${
                theme === "light"
                  ? "hover:bg-gray-200 text-gray-900"
                  : "hover:bg-gray-700 text-white"
              }`}
              aria-label="Favorites"
            >
              <UserIcon className="h-6 w-6" />
              {favoriteCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6 text-gray-900" />
              ) : (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;