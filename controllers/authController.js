  const User = require('../models/User');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const { OAuth2Client } = require('google-auth-library');
  const logger = require('../utils/logger');

  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  exports.register = async (req, res) => {
    try {
      const { name, email, password, googleToken } = req.body;

      if (googleToken) {
        const googleUser = await handleGoogleSignup(name, email, googleToken);
        const token = generateJWT(googleUser);
        return res.status(201).json({ token });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      const token = generateJWT(newUser);
      res.status(201).json({ token });
    } catch (err) {
      logger.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password, googleToken } = req.body;

      if (googleToken) {
        const googleUser = await handleGoogleLogin(googleToken);
        const token = generateJWT(googleUser);
        return res.json({ token });
      }

    
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = generateJWT(user);
      res.json({ token });
    } catch (err) {
      logger.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  async function handleGoogleSignup(name, email, googleToken) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();


      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name: payload.name, email: payload.email, password: null });
        await user.save();
      }
      return user;
    } catch (error) {
      logger.error('Error handling Google sign-up:', error);
      throw error;
    }
  }

  async function handleGoogleLogin(googleToken) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({ email: payload.email });
      if (!user) {
        user = new User({ name: payload.name, email: payload.email, password: null });
        await user.save();
      }
      return user;
    } catch (error) {
      logger.error('Error handling Google login:', error);
      throw error;
    }
  }

  function generateJWT(user) {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }