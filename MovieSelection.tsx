import React from 'react';
import { Film } from 'lucide-react';
import { Movie } from '../types';
import { movies } from '../data';

interface MovieSelectionProps {
  onSelectMovie: (movie: Movie) => void;
}

export function MovieSelection({ onSelectMovie }: MovieSelectionProps) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Film className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Select a Movie</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectMovie(movie)}
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{movie.title}</h3>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>{movie.language}</span>
                <span>{movie.genre}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">
                  ${movie.price}
                </span>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={() => onSelectMovie(movie)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}