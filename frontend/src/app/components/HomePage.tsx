import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from './Header';
import { ItemCard } from './ItemCard';
import { ItemDetailModal } from './ItemDetailModal';
import { AddItemModal } from './AddItemModal';
import { NotificationPanel } from './NotificationPanel';
import { ChatModal } from './ChatModal';
import { BookOpen, Laptop, Gift, ArrowLeftRight, DollarSign, Plus, Search } from 'lucide-react';
import { Item, ActionType, Category, BookGenre, DeviceType } from '../types';

export const HomePage = () => {
  const { items, notifications, user } = useApp();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState<ActionType>('donate');
  const [showNotifications, setShowNotifications] = useState(false);
  const [chatItemId, setChatItemId] = useState<string | null>(null);
  const [chatPartnerId, setChatPartnerId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedActionType, setSelectedActionType] = useState<ActionType | 'All'>('All');
  const [selectedGenre, setSelectedGenre] = useState<BookGenre | 'All'>('All');
  const [selectedDeviceType, setSelectedDeviceType] = useState<DeviceType | 'All'>('All');

  const unreadNotifications = notifications.filter(n => !n.read && n.userId === user?.id);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesActionType = selectedActionType === 'All' || item.actionType === selectedActionType;
      const matchesGenre =
        selectedGenre === 'All' || (item.category === 'Books' && item.genre === selectedGenre);
      const matchesDeviceType =
        selectedDeviceType === 'All' ||
        (item.category === 'Electronics' && item.deviceType === selectedDeviceType);

      return (
        matchesSearch && matchesCategory && matchesActionType && matchesGenre && matchesDeviceType
      );
    });
  }, [items, searchQuery, selectedCategory, selectedActionType, selectedGenre, selectedDeviceType]);

  const handleAddItem = (type: ActionType) => {
    setAddModalType(type);
    setShowAddModal(true);
  };

  const handleOpenChat = (itemId: string, partnerId: string) => {
    setChatItemId(itemId);
    setChatPartnerId(partnerId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-beige-50">
      <Header
        onOpenNotifications={() => setShowNotifications(true)}
        unreadCount={unreadNotifications.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-purple-900 mb-4">Welcome to ShareSpace</h1>
            <p className="text-purple-600 mb-6">
              A platform to donate, trade, or sell books and electronics easily. Connect with students
              and community members to give items a second life while helping others.
            </p>

            {/* Category Buttons */}
            <div className="flex gap-4 justify-center mb-6">
              <button
                onClick={() =>
                  setSelectedCategory(selectedCategory === 'Books' ? 'All' : 'Books')
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                  selectedCategory === 'Books'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Books</span>
              </button>
              <button
                onClick={() =>
                  setSelectedCategory(selectedCategory === 'Electronics' ? 'All' : 'Electronics')
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
                  selectedCategory === 'Electronics'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <Laptop className="w-5 h-5" />
                <span>Electronics</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => handleAddItem('donate')}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
              >
                <Gift className="w-5 h-5" />
                <span>Donate Item</span>
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAddItem('trade')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                <ArrowLeftRight className="w-5 h-5" />
                <span>Trade Item</span>
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAddItem('sell')}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                <DollarSign className="w-5 h-5" />
                <span>Sell Item</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="space-y-4">
            {/* Action Type Filter */}
            <div>
              <h4 className="text-purple-900 mb-2">Type</h4>
              <div className="flex flex-wrap gap-2">
                {(['All', 'donate', 'trade', 'sell'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedActionType(type)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      selectedActionType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {type === 'All' ? 'All Items' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Genre Filter */}
            {(selectedCategory === 'All' || selectedCategory === 'Books') && (
              <div>
                <h4 className="text-purple-900 mb-2">Book Genre</h4>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      'All',
                      'Fiction',
                      'Non-Fiction',
                      'Textbook',
                      'Science',
                      'History',
                      'Literature',
                      'Mathematics',
                      'Other',
                    ] as const
                  ).map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-4 py-2 rounded-xl transition-all ${
                        selectedGenre === genre
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Device Type Filter */}
            {(selectedCategory === 'All' || selectedCategory === 'Electronics') && (
              <div>
                <h4 className="text-purple-900 mb-2">Device Type</h4>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      'All',
                      'Phone',
                      'Laptop',
                      'Tablet',
                      'Calculator',
                      'Headphones',
                      'Other',
                    ] as const
                  ).map((device) => (
                    <button
                      key={device}
                      onClick={() => setSelectedDeviceType(device)}
                      className={`px-4 py-2 rounded-xl transition-all ${
                        selectedDeviceType === device
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {device}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Items Grid */}
        <div>
          <h3 className="text-purple-900 mb-4">
            {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Available
          </h3>
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
              <p className="text-purple-400">No items found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onOpenChat={handleOpenChat}
        />
      )}

      {showAddModal && (
        <AddItemModal actionType={addModalType} onClose={() => setShowAddModal(false)} />
      )}

      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}

      {chatItemId && chatPartnerId && (
        <ChatModal
          itemId={chatItemId}
          partnerId={chatPartnerId}
          onClose={() => {
            setChatItemId(null);
            setChatPartnerId(null);
          }}
        />
      )}
    </div>
  );
};
