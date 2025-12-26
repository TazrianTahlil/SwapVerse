import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type ChatModalProps = {
  itemId: string;
  partnerId: string;
  onClose: () => void;
};

export const ChatModal = ({ itemId, partnerId, onClose }: ChatModalProps) => {
  const { messages, sendMessage, user, items, markMessageAsRead } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const item = items.find(i => i.id === itemId);
  const partnerName = item?.ownerId === partnerId ? item.ownerName : 'User';

  const chatMessages = messages
    .filter(
      m =>
        m.itemId === itemId &&
        ((m.senderId === user?.id && m.receiverId === partnerId) ||
          (m.senderId === partnerId && m.receiverId === user?.id))
    )
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  useEffect(() => {
    // Mark messages as read
    chatMessages.forEach(msg => {
      if (msg.receiverId === user?.id && !msg.read) {
        markMessageAsRead(msg.id);
      }
    });
  }, [chatMessages, user?.id, markMessageAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(partnerId, itemId, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="border-b border-purple-100 p-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-purple-900">{partnerName}</h2>
            {item && <p className="text-purple-600">{item.name}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-purple-400">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            chatMessages.map((message) => {
              const isOwn = message.senderId === user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      isOwn
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-50 text-purple-900'
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                    <p
                      className={`mt-2 ${
                        isOwn ? 'text-purple-200' : 'text-purple-500'
                      }`}
                    >
                      {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="border-t border-purple-100 p-4 flex gap-3"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
