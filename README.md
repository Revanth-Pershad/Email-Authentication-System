<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Authentication Package</title>
</head>
<body>
    <h1>Email Authentication Package</h1>
    <p>This is a Node.js package that provides a secure and easy-to-use API for user registration, login, password reset, and email authentication.</p>

    <h2>Features</h2>
    <ul>
        <li>User registration with email and password validation</li>
        <li>Login with email and password</li>
        <li>Password reset with email verification</li>
        <li>Secure JWT based authentication</li>
    </ul>

    <h2>Installation</h2>
    <p>npm install email-authentication-package<br>
    <strong>Use code with caution.</strong></p>

    <h2>Usage</h2>
    <ol>
        <li><strong>Import the package:</strong>
            <pre><code>const express = require('express');
const router = require('email-authentication-package');

const app = express();

app.use('/api/users', router);

// ... other routes and app configuration</code></pre>
            <strong>Use code with caution.</strong>
        </li>
        <li><strong>Environment Variables:</strong>
            <ul>
                <li><code>JWT_SECRET</code>: A secret string used to sign JSON Web Tokens (JWT).</li>
                <li><code>emailUser</code>: The email address used to send password reset emails.</li>
                <li><code>emailPassword</code>: The password for the email address used to send password reset emails.</li>
            </ul>
        </li>
        <li><strong>User Model:</strong>
            <p>Create a model for your users. This is an example using Mongoose:</p>
            <pre><code>const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);</code></pre>
            <strong>Use code with caution.</strong>
        </li>
    </ol>

    <h2>Routes</h2>
    <p>The package provides the following routes:</p>
    <ul>
        <li><code>/api/users/register</code>: Registers a new user.</li>
        <li><code>/api/users/login</code>: Logs in a user.</li>
        <li><code>/api/users/me</code>: Gets the currently logged-in user's data (requires authentication).</li>
        <li><code>/api/users/forgotPassword</code>: Sends a password reset email.</li>
        <li><code>/api/users/resetPassword</code>: Resets a user's password (requires a valid reset token).</li>
    </ul>

    <h2>Documentation</h2>
    <p>For detailed documentation on each route and its parameters, please refer to the code within the package.</p>

    <h2>Contributing</h2>
    <p>We welcome contributions to this package. Please fork the repository and submit a pull request with your changes.</p>

    <h2>License</h2>
    <p>This package is licensed under the MIT License. See the LICENSE file for details.</p>

    <h2>Author(s)</h2>
    <p>Puli Revanth Pershad</p>
</body>
</html>
