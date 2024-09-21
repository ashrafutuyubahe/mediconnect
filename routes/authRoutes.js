// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User object that needs to be registered. `googleToken` is optional and used for Google OAuth signup.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account
 *               googleToken:
 *                 type: string
 *                 description: Google OAuth token (optional)
 *             required:
 *               - name
 *               - email
 *               - password
 *           example:
 *             name: "Jane Doe"
 *             email: "janedoe@example.com"
 *             password: "StrongP@ssw0rd"
 *             googleToken: "ya29.A0ARrdaM... # This is optional and only needed for Google signup"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated requests
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       400:
 *         description: User already exists or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "User already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error"
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User credentials for login. `googleToken` is optional and used for Google OAuth login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account
 *               googleToken:
 *                 type: string
 *                 description: Google OAuth token (optional)
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: "janedoe@example.com"
 *             password: "StrongP@ssw0rd"
 *             googleToken: "ya29.A0ARrdaM... # This is optional and only needed for Google login"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated requests
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid email or password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error"
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Google login callback
 *     tags: [Authentication]
 *     requestBody:
 *       description: Google OAuth token for authentication. This token is required for Google login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleToken:
 *                 type: string
 *                 description: Google OAuth token
 *             required:
 *               - googleToken
 *           example:
 *             googleToken: "ya29.A0ARrdaM..."
 *     responses:
 *       200:
 *         description: User authenticated via Google successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated requests
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       400:
 *         description: Bad request or invalid Google token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid Google token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Internal server error"
 */
router.post('/google', authController.googleLoginCallback);

module.exports = router;
