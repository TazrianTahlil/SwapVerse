import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, LogOut, User, Menu, X } from 'lucide-react';

type Page = 'home' | 'marketplace' | 'about' | 'contact';

type HeaderProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAuthClick: () => void;
};

export const Header = ({ currentPage, onNavigate, onAuthClick }: HeaderProps) => {
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'marketplace', label: 'Marketplace' },
    { page: 'about', label: 'About' },
    { page: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg"></div>
            <h2 className="text-purple-900">ShareSpace</h2>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`transition-colors ${
                  currentPage === page
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-900">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-purple-600" />
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-purple-50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-purple-600" />
            ) : (
              <Menu className="w-6 h-6 text-purple-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <nav className="flex flex-col gap-4">
              {navLinks.map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => {
                    onNavigate(page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-xl transition-colors ${
                    currentPage === page
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="border-t border-purple-100 pt-4 mt-2">
                {user ? (
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-900">{user.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5 text-purple-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAuthClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
