import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const cleanedPath = pathname.split('?')[0]
  const isHome = cleanedPath === '/' || cleanedPath === '' || cleanedPath === '/index.html' || hash === '#/'
  // Debug: log routing state to help diagnose visibility issues
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('Navbar routing:', { pathname, hash, cleanedPath, isHome, isAuthenticated })
  }

  const userName = user?.name || (user?.email ? user.email.split('@')[0] : null);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // ignore API errors, still clear client state
    }
    dispatch(logoutAction());
    navigate({ to: '/auth' });
  };

  return (
    <nav className="bg-white border border-b-black rounded-b-lg overflow-hidden">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>

          {/* Center - Home button (hidden on Home page) */}
          {!isHome && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => navigate({ to: '/' })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
              >
                Home
              </button>
            </div>
          )}

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isHome ? (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {userName || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;