import React from 'react';
import { Book, Laptop, Heart, RefreshCw, DollarSign, Users, Shield, Zap } from 'lucide-react';

type LandingPageProps = {
  onExplore: () => void;
};

export const LandingPage = ({ onExplore }: LandingPageProps) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6 text-purple-900">
            Share, Trade, and Discover
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            A community-driven marketplace for students and individuals to donate, 
            trade, and sell books and electronics. Build connections while sharing resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Marketplace
            </button>
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-purple-900">
            How ShareSpace Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-purple-900">Donate</h3>
              <p className="text-gray-700">
                Give away books and electronics you no longer need. Help others while decluttering your space.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-purple-900">Trade</h3>
              <p className="text-gray-700">
                Exchange items with other members. Get what you need while helping someone else.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-purple-900">Sell</h3>
              <p className="text-gray-700">
                List items for sale and earn money. Set your own prices and connect with buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-[#F5F3F0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-purple-900">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <button
              onClick={onExplore}
              className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Book className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-purple-900 mb-1">Books</h3>
                  <p className="text-gray-600">Textbooks, novels, and more</p>
                </div>
              </div>
            </button>

            <button
              onClick={onExplore}
              className="group p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Laptop className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-purple-900 mb-1">Electronics</h3>
                  <p className="text-gray-600">Laptops, tablets, and gadgets</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12 text-purple-900">
            Why Choose ShareSpace?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="mb-2 text-purple-900">Community Driven</h4>
              <p className="text-gray-600">Connect with students and locals</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="mb-2 text-purple-900">Safe & Secure</h4>
              <p className="text-gray-600">Verified users and transactions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="mb-2 text-purple-900">Easy to Use</h4>
              <p className="text-gray-600">Simple listing and browsing</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="mb-2 text-purple-900">Sustainable</h4>
              <p className="text-gray-600">Reduce waste, reuse resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of students and individuals sharing resources in your community.
          </p>
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
          >
            Browse Marketplace
          </button>
        </div>
      </section>
    </div>
  );
};
