export default function forgetPasswordTemp(data) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 500px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #3f97cf;
      padding: 30px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
    }
    .button {
      display: block;
      width: fit-content;
      background-color: #FF6F00;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      margin: 20px auto;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #aaa;
      padding: 20px;
    }

    @media screen and (max-width: 600px) {
      .content, .header {
        padding: 20px;
      }
      .button {
        padding: 10px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hi [User Name],</p>
      <p>We received a request to reset your password. If this was you, just click the button below to choose a new password:</p>
      <a href="${data.resetUrl}" class="button">Reset My Password</a>
      <p>If you didn’t request a password reset, you can safely ignore this email. Your password will remain the same.</p>
    </div>
    <div class="footer">
      &copy; 2025 Your Company Name. All rights reserved.
    </div>
  </div>
</body>
</html>

    `
}