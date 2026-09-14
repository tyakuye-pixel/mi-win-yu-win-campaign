# Setup Guide - Mi Win Yu Win Campaign Dashboard

## Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Java** (for Android development)
- **Android Studio** (for Android emulator, optional)
- **Xcode** (for iOS development, Mac only)
- **Firebase Project** (create at https://console.firebase.google.com)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/tyakuye-pixel/mi-win-yu-win-campaign.git
cd mi-win-yu-win-campaign

# Install root dependencies
npm install
```

## Step 2: Frontend Setup (React Native/Expo)

```bash
cd mobile
npm install

# Create .env file
cp .env.example .env
```

### Configure `mobile/.env`

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
REACT_APP_FIREBASE_DATABASE_URL=https://YOUR_PROJECT.firebaseio.com
```

## Step 3: Backend Setup (Node.js API)

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

### Configure `backend/.env`

```
PORT=5000
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_PRIVATE_KEY="YOUR_PRIVATE_KEY"
FIREBASE_CLIENT_EMAIL=YOUR_CLIENT_EMAIL
FIREBASE_DATABASE_URL=https://YOUR_PROJECT.firebaseio.com

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

## Step 4: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project: `mi-win-yu-win`
3. Enable these services:
   - ✅ Authentication (Email/Password, Google Sign-in)
   - ✅ Realtime Database
   - ✅ Cloud Storage
   - ✅ Cloud Functions (optional)

### Firebase Authentication Rules

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    },
    "supporters": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Get Firebase Admin Credentials

1. In Firebase Console, go to **Project Settings**
2. Click **Service Accounts** tab
3. Click **Generate new private key**
4. A JSON file will download - use these values in `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

## Step 5: Run the Application

### Option A: Web Version

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Should show: "Mi Win Yu Win Campaign API running on port 5000"

# Terminal 2 - Frontend
cd mobile
npm start
# Press 'w' to open in browser
```

### Option B: Android Emulator

```bash
# Terminal 1 - Backend (same as above)
cd backend
npm run dev

# Terminal 2 - Mobile app
cd mobile
npm start
# Press 'a' for Android
# (Android Studio should open an emulator)
```

### Option C: Android Physical Device

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Mobile app
cd mobile
npm start
# Press 'a' for Android
# Scan QR code with Expo Go app
```

### Option D: iOS Simulator (Mac only)

```bash
cd mobile
npm start
# Press 'i' for iOS
```

## Step 6: Test the Application

### Create Test Account

1. Click **Sign Up**
2. Enter test credentials:
   - Email: `test@example.com`
   - Password: `Test123!@#`
   - Role: Select `Coordinator`

### Add Test Data

```bash
# Backend API test
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","timestamp":"2024-01-01T12:00:00Z"}
```

## Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### "Expo CLI not found"
```bash
npm install -g expo-cli
expo --version  # Should show version
```

### "Firebase connection error"
- Check `.env` credentials are correct
- Ensure Firebase project is active
- Check network connection

### "Android emulator won't start"
```bash
# List available emulators
emulator -list-avds

# Start emulator manually
emulator -avd [emulator_name]
```

### "Port 5000 already in use"
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

## Next Steps

1. ✅ Familiarize yourself with the dashboard
2. ✅ Create your campaign team accounts
3. ✅ Add supporter records
4. ✅ Configure ward targets
5. ✅ Set up budget tracking

For more documentation, see `/docs` folder.
