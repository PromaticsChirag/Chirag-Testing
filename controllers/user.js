const mongoose = require('mongoose');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { password, email, name } = req.body;
  try {
    const existing = await User.findOne({
      email: email
    })

    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = new User({ password, email, name });
    await user.save();
    res.json({ success: true, message: 'User created successfully'});
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
exports.getUsers = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const users = await User.find({ email, password });

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Wrong email or password' });
    }

    res.json({ code: 200, message: 'User Found', users });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
