# Email Authentication System

This Email Authentication System is a comprehensive solution designed to enhance the security and integrity of online registration processes. Utilizing Node.js and Express, it integrates seamlessly into web applications, offering a robust mechanism for verifying user email addresses during account creation or update procedures.

<p align="center">
  <img src="https://raw.githubusercontent.com/Revanth-Pershad/Email-Authentication-System/main/img/auth.jpg" alt="Email Authentication System" width="400"/>
</p>


## Features

- **Email Verification:** Sends a verification link to the user's email address to confirm authenticity.
- **Security:** Implements middleware to ensure that only verified email addresses can access certain functionalities.
- **Flexibility:** Designed to be integrated with both new and existing web applications.
- **Reset Password through Email:** Utilizes NodeMailer to enable users to reset their passwords via email, enhancing security and user convenience.
- **Encryption for Password Storage:** Employs bcryptjs for hashing and securely storing user passwords to protect against unauthorized access.

## Code Explanation

### Routes

1. **User Registration (`POST /api/users`):** Allows new users to register by providing an employee ID, email, and password. It checks for existing users with the same email or employee ID, hashes the password using bcryptjs, and then stores the user in the database.

2. **User Login (`POST /api/users/login`):** Authenticates users by their email and password. It uses bcryptjs to compare the submitted password with the stored hashed password and, if successful, returns a JSON Web Token (JWT) for session management.

3. **Get User Data (`GET /api/users/me`):** A private route that returns the authenticated user's data, including employee ID and email, based on the provided JWT.

4. **Request Reset Password (`POST /api/users/resetPassword`):** Allows users to change their password by submitting a new password along with a valid JWT obtained through the reset password process.

5. **Request Forgot Password (`POST /api/users/forgotPassword`):** Enables users to request a password reset. It checks if the user's email exists in the database, then generates a JWT and sends an email to the user with a link to reset the password.

### Email Sending

The `sendPasswordReset` function configures a NodeMailer transporter using SMTP settings, specifically for Gmail in this case. It sends an email to the user's email address with a link to reset their password. The link includes a JWT as a query parameter for secure identification.

### JWT Generation

The `generateToken` function generates a JSON Web Token (JWT) that includes the user's ID and has a set expiration time. This token is used for authenticating API requests and managing user sessions.

## Getting Started

[Include installation, configuration, and usage instructions here based on the initial README content]

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
