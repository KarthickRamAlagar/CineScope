import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-2">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CineScope. All rights reserved &#174;.
          </p>

          <div className="flex space-x-6">
            {/* Facebook */}
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-800" aria-label="Facebook">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.5228-4.4772-10-10-10S2 6.4772 2 12c0 4.9915 3.657 9.1283 8.438 9.8785v-6.987h-2.54v-2.891h2.54V9.797c0-2.5063 1.492-3.89 3.777-3.89 1.0937 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.9885C18.343 21.1283 22 16.9915 22 12z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-800" aria-label="Instagram">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>

            {/* Twitter */}
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-800" aria-label="Twitter">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675v-.531a8.348 8.348 0 0 0 2.048-2.124 8.19 8.19 0 0 1-2.357.646A4.118 4.118 0 0 0 21.448 4.8a8.224 8.224 0 0 1-2.605.996A4.107 4.107 0 0 0 15.447 4c-2.266 0-4.102 1.836-4.102 4.102 0 .321.036.634.106.935A11.65 11.65 0 0 1 3.17 5.15a4.102 4.102 0 0 0 1.27 5.47 4.072 4.072 0 0 1-1.857-.513v.052a4.1 4.1 0 0 0 3.292 4.016 4.093 4.093 0 0 1-1.852.07 4.104 4.104 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
