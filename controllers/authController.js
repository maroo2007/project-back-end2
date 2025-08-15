const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const getSignedJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Create token
    const token = getSignedJwtToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password were entered
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Create token
    const token = getSignedJwtToken(user._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getMe = async (req, res) => {
  
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};
