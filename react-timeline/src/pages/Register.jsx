import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * Register Component
 *
 * This component provides a registration form for new users to create an account.ד
 * On successful registration, the user is redirected to the login page.
 *
 * Features:
 * - Input validation to ensure passwords match before submitting
 * - Displays success and error messages
 * - Navigates to login page after successful registration with a delay
 * - Fully responsive design for all device sizes
 *
 * Hooks used:
 * - useState: Manages form input values, error, and success states
 * - useNavigate: Handles navigation to other routes
 */

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true); 
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 overflow-x-auto transition-colors duration-300">
      <Header />

      <div className="flex-1 max-w-sm sm:max-w-md w-full m-4 sm:m-6 md:m-8 p-4 sm:p-6 md:p-8 rounded-xl bg-white dark:bg-gray-800 shadow-[0_8px_16px_rgba(0,106,113,0.2)] dark:shadow-none transition-colors duration-300">
        <h2 className="text-[#006A71] dark:text-[#3dd6f3] text-center text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 p-3 sm:p-4 rounded mb-4 text-center font-medium transition-colors duration-300 text-sm sm:text-base">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 p-3 sm:p-4 rounded mb-4 text-center font-medium transition-colors duration-300 text-sm sm:text-base">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition-colors duration-300 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition-colors duration-300 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition-colors duration-300 text-sm sm:text-base"
            />
          </div>

          <button
            id="btnRegister"
            type="submit"
            className="w-full bg-[#006A71] dark:bg-[#3dd6f3] text-white dark:text-gray-900 font-bold text-base sm:text-lg py-2 sm:py-2.5 px-4 sm:px-5 rounded-md cursor-pointer
                       transition-transform duration-300 hover:bg-[#10b2bd] dark:hover:bg-[#0f7389]
                       hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,106,113,0.3)]"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 sm:mt-6 text-[#006A71] dark:text-[#3dd6f3] transition-colors duration-300 text-sm sm:text-base">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#004a4f] dark:text-[#66c9f4] underline font-bold cursor-pointer hover:text-[#006A71] dark:hover:text-[#3dd6f3] transition-colors duration-300"
          >
            Login here
          </span>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Register;