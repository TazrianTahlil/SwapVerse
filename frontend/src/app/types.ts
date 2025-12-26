export type User = {
  id: string;
  email: string;
  name: string;
};

export type Category = 'Books' | 'Electronics';

export type ActionType = 'donate' | 'trade' | 'sell';

export type ItemCondition = 'New' | 'Good' | 'Used';

export type ItemStatus = 'Available' | 'Requested' | 'Given';

export type DeviceType = 'Phone' | 'Laptop' | 'Tablet' | 'Calculator' | 'Headphones' | 'Other';

export type BookGenre = 'Fiction' | 'Non-Fiction' | 'Textbook' | 'Science' | 'History' | 'Literature' | 'Mathematics' | 'Other';

export type Item = {
  id: string;
  name: string;
  category: Category;
  actionType: ActionType;
  condition: ItemCondition;
  conditionNote: string;
  status: ItemStatus;
  ownerId: string;
  ownerName: string;
  image: string;
  price?: number;
  tradeExpectation?: string;
  genre?: BookGenre;
  deviceType?: DeviceType;
  createdAt: Date;
};

export type Request = {
  id: string;
  itemId: string;
  requesterId: string;
  requesterName: string;
  message: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  itemId: string;
  text: string;
  createdAt: Date;
  read: boolean;
};

export type Notification = {
  id: string;
  userId: string;
  type: 'request' | 'message' | 'trade' | 'purchase';
  message: string;
  itemId: string;
  createdAt: Date;
  read: boolean;
};
