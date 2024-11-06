<h1>Yummy Foods</h1>
Yummy Foods is a grocery delivery app designed to simplify the process of ordering groceries online. The app offers a user-friendly interface for browsing products, real-time order tracking, secure payment options, and seamless delivery to your doorstep.

Table of Contents
Features
Technologies Used
Technical Challenges and Solutions
Contributors


Features
User Authentication: Secure login using Google authentication for quick and easy access.
Product Browsing and Search: Browse various categories and search for products quickly.
Shopping Cart and Checkout: Easy-to-use cart and checkout process with order summaries and payment options.
Secure Payment Integration: Razorpay integration for secure and seamless payments.
Real-Time Order Tracking: Track your order status in real-time with notifications.
Push Notifications: Receive order updates and notifications on delivery status.

Technologies Used
Front-End: React Native, Razorpay UI Integration
Back-End: Node.js, Express.js, Razorpay API, Google OAuth 2.0
Database: MongoDB
Real-Time Communication: WebSockets, Firebase Cloud Messaging (FCM) for notifications
Other Tools: Firebase for cloud messaging, Git for version control

Technical Challenges and Solutions
Google Authentication Integration:

Configured OAuth 2.0 for Google sign-in.
Validated tokens server-side for secure user login.
Razorpay Payment Gateway:

Implemented secure transaction handling with Razorpay.
Used webhooks for real-time payment status updates.
Real-Time Order Tracking:


Optimized MongoDB queries with indexing.
Added a caching layer to improve response times.
Contributors

Toyash Patil: Back-End Development and Database Management
Khushi Poojary: UI/UX Design and Front-End Development
