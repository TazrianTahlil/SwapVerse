import React, { useState } from 'react';
import { X, BookOpen, Laptop } from 'lucide-react';

type AuthModalProps = {
  onClose: () => void;
};

export const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true); // State for toggling between login/signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Function to handle form submission (either login or signup)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Set the API URL based on whether the user is logging in or signing up
      const url = isLogin
        ? 'http://localhost:5000/api/auth/login' // Login endpoint
        : 'http://localhost:5000/api/auth/signup'; // Signup endpoint

      // Prepare the body data
      const body = {
        email,
        password,
        fullName: isLogin ? undefined : name, // Only include name when signing up
      };

      // Send the request to the backend API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, store the JWT and user data in localStorage
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: data._id,
          fullName: data.fullName,
          email: data.email,
        }));

        window.location.reload();
        onClose();
      } else {
        // Handle errors and display them in the console
        alert(`Error: ${data.error || 'Unknown error'}`);
        console.error('Authentication error:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5 text-purple-600" />
        </button>

        <div className="p-8">
          {/* Logo and Branding */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="bg-purple-100 p-2 rounded-xl">
                <Laptop className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h2 className="text-purple-900 mb-1">Welcome to ShareSpace</h2>
            <p className="text-purple-600">Join our community marketplace</p>
          </div>

          {/* Tabs for switching between Login and Signup */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input (only visible on Sign Up) */}
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
                  required={!isLogin} // Required for sign up only
                />
              </div>
            )}

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-2xl hover:bg-purple-700 transition-colors mt-6"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Switch Between Login/Sign Up */}
          <p className="text-center text-purple-400 mt-4">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

          {/* Demo Note */}
          <div className="mt-4 text-center bg-purple-50 rounded-2xl p-3">
            <p className="text-purple-700 text-sm">
              Demo: Use your email and password to {isLogin ? 'login' : 'sign up'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
