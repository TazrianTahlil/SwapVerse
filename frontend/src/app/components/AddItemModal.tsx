import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActionType, Category, ItemCondition, BookGenre, DeviceType } from '../types';
import { X } from 'lucide-react';

type AddItemModalProps = {
  actionType: ActionType;
  onClose: () => void;
};

export const AddItemModal = ({ actionType, onClose }: AddItemModalProps) => {
  const { addItem } = useApp();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Books');
  const [condition, setCondition] = useState<ItemCondition>('Good');
  const [conditionNote, setConditionNote] = useState('');
  const [price, setPrice] = useState('');
  const [tradeExpectation, setTradeExpectation] = useState('');
  const [genre, setGenre] = useState<BookGenre>('Other');
  const [deviceType, setDeviceType] = useState<DeviceType>('Other');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const itemData: any = {
      name,
      category,
      actionType,
      condition,
      conditionNote,
      image: imageUrl || 'https://images.unsplash.com/photo-1630715216350-1a8f46f021bf',
    };

    if (actionType === 'sell') {
      itemData.price = parseFloat(price);
    }

    if (actionType === 'trade') {
      itemData.tradeExpectation = tradeExpectation;
    }

    if (category === 'Books') {
      itemData.genre = genre;
    } else {
      itemData.deviceType = deviceType;
    }

    addItem(itemData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-purple-100 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-purple-900 capitalize">{actionType} Item</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-purple-900 mb-2">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
              placeholder="e.g., MacBook Pro 13 inch"
              required
            />
          </div>

          <div>
            <label className="block text-purple-900 mb-2">Category</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCategory('Books')}
                className={`flex-1 py-3 rounded-2xl transition-all ${
                  category === 'Books'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                Books
              </button>
              <button
                type="button"
                onClick={() => setCategory('Electronics')}
                className={`flex-1 py-3 rounded-2xl transition-all ${
                  category === 'Electronics'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                Electronics
              </button>
            </div>
          </div>

          {category === 'Books' && (
            <div>
              <label className="block text-purple-900 mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as BookGenre)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Textbook">Textbook</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Literature">Literature</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {category === 'Electronics' && (
            <div>
              <label className="block text-purple-900 mb-2">Device Type</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value as DeviceType)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
              >
                <option value="Phone">Phone</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Calculator">Calculator</option>
                <option value="Headphones">Headphones</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-purple-900 mb-2">Condition</label>
            <div className="flex gap-3">
              {(['New', 'Good', 'Used'] as ItemCondition[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={`flex-1 py-3 rounded-2xl transition-all ${
                    condition === c
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-purple-900 mb-2">Condition Note</label>
            <textarea
              value={conditionNote}
              onChange={(e) => setConditionNote(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors resize-none"
              placeholder="Describe the condition of the item..."
              rows={3}
              required
            />
          </div>

          {actionType === 'sell' && (
            <div>
              <label className="block text-purple-900 mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          )}

          {actionType === 'trade' && (
            <div>
              <label className="block text-purple-900 mb-2">What are you looking for?</label>
              <textarea
                value={tradeExpectation}
                onChange={(e) => setTradeExpectation(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors resize-none"
                placeholder="Describe what you'd like to trade for..."
                rows={3}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-purple-900 mb-2">Image URL (optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className={`flex-1 py-3 rounded-2xl text-white transition-colors ${
                actionType === 'donate'
                  ? 'bg-green-500 hover:bg-green-600'
                  : actionType === 'trade'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
