import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Item, Request, Message, Notification } from '../types';
import { mockItems } from '../data/mockData';

type AppContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'ownerId' | 'ownerName' | 'status'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  requests: Request[];
  addRequest: (itemId: string, message: string) => void;
  updateRequestStatus: (requestId: string, status: Request['status']) => void;
  messages: Message[];
  sendMessage: (receiverId: string, itemId: string, text: string) => void;
  markMessageAsRead: (messageId: string) => void;
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>(mockItems);
  const [requests, setRequests] = useState<Request[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser: User = {
      id: 'current-user',
      email,
      name: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup
    const mockUser: User = {
      id: 'current-user',
      email,
      name,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'ownerId' | 'ownerName' | 'status'>) => {
    if (!user) return;

    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      ownerId: user.id,
      ownerName: user.name,
      status: 'Available',
      createdAt: new Date(),
    };

    setItems([newItem, ...items]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addRequest = (itemId: string, message: string) => {
    if (!user) return;

    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newRequest: Request = {
      id: Date.now().toString(),
      itemId,
      requesterId: user.id,
      requesterName: user.name,
      message,
      createdAt: new Date(),
      status: 'pending',
    };

    setRequests([...requests, newRequest]);

    // Update item status
    updateItem(itemId, { status: 'Requested' });

    // Create notification for item owner
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: item.ownerId,
      type: 'request',
      message: `${user.name} has requested your ${item.actionType === 'donate' ? 'donation' : item.actionType} item: ${item.name}`,
      itemId,
      createdAt: new Date(),
      read: false,
    };

    setNotifications([...notifications, newNotification]);
  };

  const updateRequestStatus = (requestId: string, status: Request['status']) => {
    setRequests(
      requests.map(request => (request.id === requestId ? { ...request, status } : request))
    );

    const request = requests.find(r => r.id === requestId);
    if (request) {
      const item = items.find(i => i.id === request.itemId);
      if (status === 'accepted' && item) {
        updateItem(request.itemId, { status: 'Given' });
      } else if (status === 'rejected' && item) {
        updateItem(request.itemId, { status: 'Available' });
      }
    }
  };

  const sendMessage = (receiverId: string, itemId: string, text: string) => {
    if (!user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      itemId,
      text,
      createdAt: new Date(),
      read: false,
    };

    setMessages([...messages, newMessage]);

    // Create notification for receiver
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: receiverId,
      type: 'message',
      message: `New message from ${user.name}`,
      itemId,
      createdAt: new Date(),
      read: false,
    };

    setNotifications([...notifications, newNotification]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(messages.map(msg => (msg.id === messageId ? { ...msg, read: true } : msg)));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map(notif => (notif.id === notificationId ? { ...notif, read: true } : notif))
    );
  };

  const clearAllNotifications = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        items,
        addItem,
        updateItem,
        deleteItem,
        requests,
        addRequest,
        updateRequestStatus,
        messages,
        sendMessage,
        markMessageAsRead,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
