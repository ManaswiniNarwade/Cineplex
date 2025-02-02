import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { FoodItem } from '../types';
import { foodItems } from '../data';

interface FoodSelectionProps {
  onConfirmOrder: (items: { item: FoodItem; quantity: number }[]) => void;
}

export function FoodSelection({ onConfirmOrder }: FoodSelectionProps) {
  const [order, setOrder] = useState<Record<string, number>>({});

  const updateQuantity = (itemId: string, delta: number) => {
    setOrder(prev => {
      const newQuantity = (prev[itemId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const handleConfirm = () => {
    const orderItems = Object.entries(order).map(([itemId, quantity]) => ({
      item: foodItems.find(item => item.id === itemId)!,
      quantity
    }));
    onConfirmOrder(orderItems);
  };

  const totalAmount = Object.entries(order).reduce((sum, [itemId, quantity]) => {
    const item = foodItems.find(item => item.id === itemId);
    return sum + (item?.price || 0) * quantity;
  }, 0);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Coffee className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Add Snacks & Beverages</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-indigo-600 font-bold mt-2">${item.price}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">
                    {order[item.id] || 0}
                  </span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          onClick={handleConfirm}
          disabled={Object.keys(order).length === 0}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}