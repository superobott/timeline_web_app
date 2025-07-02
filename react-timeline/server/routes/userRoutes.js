const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const LoggedInUser = require('../models/LoggedInUserModel');

/**
 * @route   POST /register
 * @desc    Register a new user. Fails if email already exists.
 * @body    { email: string, password: string }
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      password,
      searchHistory: []
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

/**
 * @route   PUT /profile/:userId
 * @desc    Update user's email and/or password.
 * @params  userId: MongoDB ID of the user
 */
router.put('/profile/:userId', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) {
      const emailExists = await User.findOne({ 
        email, 
        _id: { $ne: req.params.userId } 
      });
      
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    await user.save();
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      email: user.email
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

/**
 * @route   POST /login
 * @desc    Log in a user using email and password.
 *          Adds user to LoggedInUser collection.
 * @body    { email: string, password: string }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const alreadyLoggedIn = await LoggedInUser.findOne({ email });
    if (!alreadyLoggedIn) {
      await LoggedInUser.create({ email });
    }

    res.json({
      success: true,
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

/**
 * @route   POST /logout
 * @desc    Logs the user out by removing from LoggedInUser collection.
 * @body    { email: string }
 */
router.post('/logout', async (req, res) => {
  try {
    const { email } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await LoggedInUser.deleteOne({ email });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
});

/**
 * @route   GET /search-history/:userId
 * @desc    Returns the user's search history (up to 10 most recent terms).
 * @params  userId: MongoDB user ID
 */
router.get('/search-history/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.searchHistory || []);
  } catch (err) {
    console.error('Search history fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /search-history
 * @desc    Adds a search term to user's history if not already included.
 *          Maintains up to 10 recent unique search terms.
 * @body    { userId: string, query: string }
 */
router.post('/search-history', async (req, res) => {
  try {
    const { userId, query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const searchTerm = query.trim().toLowerCase();
    if (!user.searchHistory.includes(searchTerm)) {
      user.searchHistory.unshift(searchTerm);
      if (user.searchHistory.length > 10) { 
        user.searchHistory = user.searchHistory.slice(0, 10);
      }
      await user.save();
    }

    res.json(user.searchHistory);
  } catch (err) {
    console.error('Error adding to search history:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
