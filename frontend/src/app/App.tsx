import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { MarketplacePage } from './components/MarketplacePage';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

type Page = 'home' | 'marketplace' | 'about' | 'contact';

function AppContent() {
  const { user } = useApp();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3F0]">
      <Header 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <LandingPage onExplore={() => setCurrentPage('marketplace')} />
        )}
        {currentPage === 'marketplace' && <MarketplacePage />}
        {currentPage === 'about' && (
          <div className="container mx-auto px-4 py-16">
            <h1 className="mb-6">About ShareSpace</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              ShareSpace is a community-driven marketplace platform where students and individuals 
              can donate, trade, and sell books and electronics. We believe in sustainability, 
              accessibility, and building connections through sharing resources.
            </p>
          </div>
        )}
        {currentPage === 'contact' && (
          <div className="container mx-auto px-4 py-16">
            <h1 className="mb-6">Contact Us</h1>
            <p className="text-lg text-gray-700 max-w-3xl mb-4">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <p className="text-gray-700">Email: support@sharespace.com</p>
          </div>
        )}
      </main>

      <Footer />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}