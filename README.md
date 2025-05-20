# Restaurant POS System MERN

This README provides instructions for setting up and deploying the Restaurant POS System built with MERN (MongoDB, Express.js, React.js, Node.js).

## 🔧 Backend Setup

### 📁 Navigate to Backend

```bash
cd backend
📥 Install Dependencies
Bash

npm install
📝 Create .env File
Create a .env file in the backend directory and add the following:

Code snippet

PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
Note: Replace the placeholder values with your actual MongoDB connection string, JWT secret, and Razorpay API keys and webhook secret.

▶️ Start the Backend Server
Bash

npm start
By default, the server runs on: http://localhost:8000

After deployment, make sure to update your frontend .env with the deployed backend URL.

🌐 Frontend Setup
📁 Navigate to Frontend
Bash

cd ../frontend
📥 Install Dependencies
Bash

npm install
📝 Create .env File
Create a .env file in the frontend directory and add the following:

Code snippet

VITE_BACKEND_URL=[https://restaurant-pos-system-mern.onrender.com](https://restaurant-pos-system-mern.onrender.com)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
Note: Replace https://restaurant-pos-system-mern.onrender.com with your deployed backend URL (if different) and your_razorpay_key_id with your actual Razorpay key ID.

▶️ Start the Frontend
Bash

npm run dev
Frontend will be available at: http://localhost:5173 (or as shown in your terminal)

📦 Deployment
🔙 Backend (Render)
The backend is deployed on Render: https://restaurant-pos-system-mern.onrender.com

Ensure your backend environment variables are set in Render under the Environment tab.

🖥️ Frontend (Vercel)
Deploy the frontend folder using Vercel or Netlify. Don’t forget to set your production environment variables.

Ensure your backend environment variables are set in Vercel under the Environment tab.

> 📂 Folder Structure (Overview)
├── Backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── app.js
│   ├── package.json
│   └── sample.env
├── Frontend
│   ├── public
│   ├── src
│   │   ├── Animations
│   │   ├── assets
│   │   ├── components
│   │   ├── constants
│   │   ├── hooks
│   │   ├── https
│   │   ├── pages
│   │   ├── reactbits
│   │   ├── redux
│   │   └── utils
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
📬 Contact
Feel free to fork, open an issue, or contribute!

👤 Developed by @rampradops28
🌟 Show some love by starring the repo!
