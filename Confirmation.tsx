import React from 'react';
import { Check, Ticket } from 'lucide-react';
import { Movie, FoodItem } from '../types';

interface ConfirmationProps {
  movie: Movie;
  seats: string[];
  foodItems: { item: FoodItem; quantity: number }[];
  onExit: () => void;
}

export function Confirmation({ movie, seats, foodItems, onExit }: ConfirmationProps) {
  const totalAmount = (
    movie.price * seats.length +
    foodItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <Check className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Booking Confirmed!
        </h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Ticket className="h-6 w-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800">Movie Details</h3>
              <p className="text-gray-600">{movie.title}</p>
              <p className="text-gray-600">{movie.language} | {movie.genre}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Seats</h3>
            <div className="flex flex-wrap gap-2">
              {seats.map(seat => (
                <span
                  key={seat}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          {foodItems.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Food & Beverages</h3>
              <ul className="space-y-2">
                {foodItems.map(({ item, quantity }) => (
                  <li key={item.id} className="flex justify-between text-gray-600">
                    <span>{item.name} x{quantity}</span>
                    <span>${(item.price * quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onExit}
          className="mt-8 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}