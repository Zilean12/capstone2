import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by making a request to the backend
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/status', { withCredentials: true });
        setIsLoggedIn(response.data.loggedIn);
      } catch (err) {
        console.error('Error checking login status:', err);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    window.location = 'http://localhost:5000/auth/google';
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      setIsLoggedIn(false);
      window.location.href = 'http://localhost:3000';
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {!isLoggedIn && (
        <button
          onClick={handleLogin}
          className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Login with Google</span>
        </button>
      )}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
