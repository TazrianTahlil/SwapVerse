import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, MessageCircle, Gift, ArrowLeftRight, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type NotificationPanelProps = {
  onClose: () => void;
};

export const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const { notifications, user, markNotificationAsRead, clearAllNotifications } = useApp();

  const userNotifications = notifications.filter(n => n.userId === user?.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <Bell className="w-5 h-5 text-purple-600" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'trade':
        return <ArrowLeftRight className="w-5 h-5 text-blue-600" />;
      case 'purchase':
        return <DollarSign className="w-5 h-5 text-orange-600" />;
      default:
        return <Gift className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center sm:justify-end z-50 p-4">
      <div className="bg-white rounded-3xl w-full sm:w-96 max-h-[80vh] sm:max-h-[90vh] overflow-hidden sm:mr-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-purple-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-purple-900">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-purple-600">{unreadCount} unread</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(80vh-100px)] sm:max-h-[calc(90vh-100px)]">
          {userNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-purple-200 mx-auto mb-3" />
              <p className="text-purple-400">No notifications yet</p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {unreadCount > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="w-full py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                >
                  Mark all as read
                </button>
              )}

              {userNotifications
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-colors ${
                      notification.read
                        ? 'bg-purple-50 hover:bg-purple-100'
                        : 'bg-purple-100 hover:bg-purple-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-purple-900">{notification.message}</p>
                        <p className="text-purple-500 mt-1">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
