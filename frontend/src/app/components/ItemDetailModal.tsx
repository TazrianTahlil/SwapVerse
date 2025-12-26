import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Item } from '../types';
import { X, MessageCircle, Gift, ArrowLeftRight, DollarSign, Pencil, Trash } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ItemDetailModalProps = {
  item: Item;
  onClose: () => void;
  onOpenChat: (itemId: string, partnerId: string) => void;
};

export const ItemDetailModal = ({ item, onClose, onOpenChat }: ItemDetailModalProps) => {
  const { user, addRequest, requests, deleteItem } = useApp();
  const [requestMessage, setRequestMessage] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const isOwner = user?.id === item.ownerId;
  const hasRequested = requests.some(
    r => r.itemId === item.id && r.requesterId === user?.id
  );

  const itemRequests = requests.filter(r => r.itemId === item.id);

  const handleRequest = () => {
    if (requestMessage.trim()) {
      addRequest(item.id, requestMessage);
      setShowRequestForm(false);
      setRequestMessage('');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(item.id);
      onClose();
    }
  };

  const getActionIcon = () => {
    switch (item.actionType) {
      case 'donate':
        return <Gift className="w-5 h-5" />;
      case 'trade':
        return <ArrowLeftRight className="w-5 h-5" />;
      case 'sell':
        return <DollarSign className="w-5 h-5" />;
    }
  };

  const getActionColor = () => {
    switch (item.actionType) {
      case 'donate':
        return 'bg-green-500';
      case 'trade':
        return 'bg-blue-500';
      case 'sell':
        return 'bg-orange-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-purple-100 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-purple-900">Item Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-purple-50 mb-6">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 ${getActionColor()} text-white px-4 py-2 rounded-full flex items-center gap-2`}>
              {getActionIcon()}
              <span className="capitalize">{item.actionType}</span>
            </div>
          </div>

          {/* Item Info */}
          <div className="space-y-4 mb-6">
            <div>
              <h1 className="text-purple-900 mb-2">{item.name}</h1>
              <p className="text-purple-600">Posted by {item.ownerName}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-xl">
                {item.category}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-xl">
                Condition: {item.condition}
              </span>
              {item.genre && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-xl">
                  {item.genre}
                </span>
              )}
              {item.deviceType && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-xl">
                  {item.deviceType}
                </span>
              )}
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl">
              <h3 className="text-purple-900 mb-2">Condition Note</h3>
              <p className="text-purple-700">{item.conditionNote}</p>
            </div>

            {item.actionType === 'trade' && item.tradeExpectation && (
              <div className="bg-blue-50 p-4 rounded-2xl">
                <h3 className="text-blue-900 mb-2">Trade Expectation</h3>
                <p className="text-blue-700">{item.tradeExpectation}</p>
              </div>
            )}

            {item.actionType === 'sell' && item.price && (
              <div className="bg-orange-50 p-4 rounded-2xl">
                <h3 className="text-orange-900 mb-2">Price</h3>
                <p className="text-orange-700">${item.price}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-purple-600">Status:</span>
              <span
                className={`px-3 py-1 rounded-xl ${
                  item.status === 'Available'
                    ? 'bg-green-100 text-green-700'
                    : item.status === 'Requested'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-2xl">
                <h3 className="text-purple-900 mb-3">Manage Item</h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>

              {itemRequests.length > 0 && (
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <h3 className="text-purple-900 mb-3">
                    Requests ({itemRequests.length})
                  </h3>
                  <div className="space-y-2">
                    {itemRequests.map(request => (
                      <div
                        key={request.id}
                        className="bg-white p-3 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <p className="text-purple-900">{request.requesterName}</p>
                          <p className="text-purple-600">{request.message}</p>
                        </div>
                        <button
                          onClick={() => onOpenChat(item.id, request.requesterId)}
                          className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5 text-purple-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Non-Owner Actions */}
          {!isOwner && (
            <div className="space-y-4">
              {!showRequestForm && !hasRequested && item.status === 'Available' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className={`flex-1 ${getActionColor()} text-white py-3 rounded-2xl hover:opacity-90 transition-opacity`}
                  >
                    {item.actionType === 'donate'
                      ? 'Request Item'
                      : item.actionType === 'trade'
                      ? 'Send Trade Request'
                      : 'Request to Buy'}
                  </button>
                  <button
                    onClick={() => onOpenChat(item.id, item.ownerId)}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat
                  </button>
                </div>
              )}

              {hasRequested && (
                <div className="bg-yellow-50 p-4 rounded-2xl text-center">
                  <p className="text-yellow-700">You have already requested this item</p>
                  <button
                    onClick={() => onOpenChat(item.id, item.ownerId)}
                    className="mt-3 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors mx-auto"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat with Owner
                  </button>
                </div>
              )}

              {showRequestForm && (
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <h3 className="text-purple-900 mb-3">Send Request</h3>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    placeholder="Write a message to the owner..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                    rows={4}
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleRequest}
                      className={`flex-1 ${getActionColor()} text-white py-3 rounded-2xl hover:opacity-90 transition-opacity`}
                    >
                      Send Request
                    </button>
                    <button
                      onClick={() => setShowRequestForm(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
