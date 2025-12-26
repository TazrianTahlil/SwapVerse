import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Laptop } from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-beige-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <div className="bg-purple-100 p-3 rounded-2xl">
              <Laptop className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-purple-900 mb-2">ShareSpace</h1>
          <p className="text-purple-600">Donate, Trade, and Sell with Ease</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-2xl transition-all ${
                isLogin
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-2xl transition-all ${
                !isLogin
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-purple-900 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-purple-900 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-purple-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-transparent focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-2xl hover:bg-purple-700 transition-colors mt-6"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-purple-400 mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className="mt-6 text-center bg-purple-100 rounded-2xl p-4">
          <p className="text-purple-700">
            Demo: Use any email and password to {isLogin ? 'login' : 'sign up'}
          </p>
        </div>
      </div>
    </div>
  );
};
