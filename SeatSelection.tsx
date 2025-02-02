import React, { useState } from 'react';
import { ArmchairIcon as ChairIcon } from 'lucide-react';

interface SeatSelectionProps {
  onSelectSeats: (seats: string[]) => void;
}

export function SeatSelection({ onSelectSeats }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      onSelectSeats(selectedSeats);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <ChairIcon className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Select Your Seats</h2>
      </div>
      
      <div className="mb-8">
        <div className="w-full bg-gray-200 p-4 text-center mb-8">Screen</div>
        <div className="grid gap-4">
          {rows.map(row => (
            <div key={row} className="flex justify-center gap-2">
              <span className="w-8 text-center font-bold">{row}</span>
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatId = `${row}${i + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={seatId}
                    className={`w-8 h-8 rounded ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <p className="text-gray-600">Selected Seats: {selectedSeats.join(', ')}</p>
          <p className="text-gray-600">Total: ${selectedSeats.length * 12.99}</p>
        </div>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}