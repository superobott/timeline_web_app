import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


/**
 * Login Component
 *
 * This component is a login form that lets users enter email and password to authenticate.
 * On success, it saves user data to localStorage and redirects to the choose page.
 *
 * Features:
 * - Displays error messages on failed login or server connection issues
 * - Navigates to registration page via a clickable link for new users
 * - Fully responsive design for all device sizes
 *
 * Hooks used:
 * - useState: Manages form inputs, loading state, and error messages
 * - useNavigate: Programmatic navigation on login success or link click
 */

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok && data.success) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userEmail', data.email);
        navigate('/choose');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setIsLoading(false);
      setError('Error connecting to server');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 transition-colors duration-300 overflow-x-auto">
      <Header />

      <div className="flex-1 max-w-sm sm:max-w-md w-full m-4 sm:m-6 md:m-8 p-4 sm:p-6 md:p-8 rounded-xl 
          bg-white dark:bg-gray-800 
          shadow-[0_8px_16px_rgba(0,106,113,0.2)] dark:shadow-none
          ">
        <h2 className="text-[#006A71] dark:text-[#3dd6f3] text-center text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
          Login to Your Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 sm:p-4 rounded mb-4 text-center font-medium text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#006A71]"
            />
          </div>
          <button
            id="btnLogin"
            type="submit"
            disabled={isLoading}
            className={`
              w-full font-bold text-base sm:text-lg py-2 sm:py-2.5 px-4 sm:px-5 rounded-md cursor-pointer
              transition-transform duration-300
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              bg-[#006A71] text-white
              dark:bg-[#3dd6f3] dark:text-gray-900
              hover:bg-[#10b2bd] dark:hover:bg-[#0f7389]
              hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,106,113,0.3)]
            `}
          >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
        </form>

        <p className="text-center mt-4 sm:mt-6 text-[#006A71] dark:text-[#3dd6f3] text-sm sm:text-base">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-[#004a4f] underline font-bold cursor-pointer hover:text-[#006A71] dark:text-[#66c9f4] dark:hover:text-[#3dd6f3]"
          >
            Register here
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
