import React from 'react';
import { Item } from '../types';
import { BookOpen, Laptop, Gift, ArrowLeftRight, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ItemCardProps = {
  item: Item;
  onClick: () => void;
};

export const ItemCard = ({ item, onClick }: ItemCardProps) => {
  const getActionIcon = () => {
    switch (item.actionType) {
      case 'donate':
        return <Gift className="w-4 h-4" />;
      case 'trade':
        return <ArrowLeftRight className="w-4 h-4" />;
      case 'sell':
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getActionColor = () => {
    switch (item.actionType) {
      case 'donate':
        return 'bg-green-100 text-green-700';
      case 'trade':
        return 'bg-blue-100 text-blue-700';
      case 'sell':
        return 'bg-orange-100 text-orange-700';
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Requested':
        return 'bg-yellow-100 text-yellow-700';
      case 'Given':
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-purple-50">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full flex items-center gap-1 ${getActionColor()}`}>
            {getActionIcon()}
            <span className="capitalize">{item.actionType}</span>
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full ${getStatusColor()}`}>
            {item.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-purple-900 flex-1">{item.name}</h3>
          {item.category === 'Books' ? (
            <BookOpen className="w-5 h-5 text-purple-400 flex-shrink-0 ml-2" />
          ) : (
            <Laptop className="w-5 h-5 text-purple-400 flex-shrink-0 ml-2" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-500">{item.ownerName}</span>
          {item.actionType === 'sell' && item.price && (
            <span className="text-orange-600">${item.price}</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg">
            {item.condition}
          </span>
          {item.genre && (
            <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg">
              {item.genre}
            </span>
          )}
          {item.deviceType && (
            <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg">
              {item.deviceType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
