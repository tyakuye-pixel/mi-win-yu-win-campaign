# Mi Win Yu Win Campaign Dashboard

A cross-platform campaign management application for Terry Guyoni Yakuye's election campaign in Menyamya Open (2027 National Election, Papua New Guinea).

## Features

✅ **Cross-Platform**: Works on Desktop (Web), Android, and iOS  
✅ **Multi-User Collaboration**: Real-time data sync across team members  
✅ **Supporter Registry**: Track supporters with preferences and commitment status  
✅ **Volunteer Management**: Manage mobilizers and field coordinators  
✅ **LLG/Ward Targeting**: Plan field coverage with ward-level targets  
✅ **Budget Tracking**: Record campaign income and expenses  
✅ **Real-Time Sync**: Firebase/backend integration for live updates  
✅ **Offline Support**: Works offline with automatic sync when online  
✅ **Role-Based Access**: Different permissions for campaign staff  

## Tech Stack

### Frontend
- **React Native + Expo** - Cross-platform mobile & web
- **React Navigation** - App navigation
- **Redux** - State management
- **Firebase Realtime Database** - Real-time sync

### Backend
- **Node.js + Express** - REST API
- **Firebase Admin SDK** - Database & Auth
- **PostgreSQL** - Production database (optional)
- **JWT** - Authentication

## Project Structure

```
mi-win-yu-win-campaign/
├── mobile/                    # React Native Expo app
│   ├── app/
│   ├── screens/
│   ├── components/
│   ├── services/
│   ├── redux/
│   ├── app.json
│   └── package.json
├── backend/                   # Node.js REST API
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
├── web/                       # Web version (Expo Web)
├── docs/                      # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Firebase project setup

### Installation

```bash
# Clone repository
git clone https://github.com/tyakuye-pixel/mi-win-yu-win-campaign.git
cd mi-win-yu-win-campaign

# Install mobile dependencies
cd mobile
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

1. Create `.env` files in `mobile/` and `backend/` directories
2. Configure Firebase credentials
3. Set up API endpoints

### Running the App

**Mobile (Android/iOS)**
```bash
cd mobile
npm start  # Opens Expo menu
# Press 'a' for Android or 'i' for iOS
```

**Web**
```bash
cd mobile
npm start
# Press 'w' for web
```

**Backend API**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

## Features In Development

### Phase 1 (MVP)
- [x] Multi-user authentication
- [x] Supporter registry with CRUD operations
- [x] Real-time data synchronization
- [ ] Offline mode with sync queue
- [ ] Role-based access control

### Phase 2
- [ ] SMS notifications
- [ ] WhatsApp integration
- [ ] Advanced analytics & reporting
- [ ] Map-based ward visualization
- [ ] Automated backup & export

### Phase 3
- [ ] AI-powered supporter insights
- [ ] Campaign activity timeline
- [ ] Mobile push notifications
- [ ] Team performance metrics

## Database Schema

### Collections
- `users` - Campaign staff with roles
- `supporters` - Supporter records with preferences
- `volunteers` - Mobilizers and coordinators
- `targets` - LLG/Ward planning targets
- `expenses` - Campaign spending records
- `income` - Fundraising records
- `activities` - Audit log of changes

## API Endpoints

```
GET  /api/supporters              # List all supporters
POST /api/supporters              # Create supporter
GET  /api/supporters/:id          # Get supporter
PUT  /api/supporters/:id          # Update supporter
DEL  /api/supporters/:id          # Delete supporter

GET  /api/volunteers              # List volunteers
POST /api/volunteers              # Create volunteer
GET  /api/volunteers/:id          # Get volunteer
PUT  /api/volunteers/:id          # Update volunteer
DEL  /api/volunteers/:id          # Delete volunteer

GET  /api/targets                 # List targets
POST /api/targets                 # Create target
GET  /api/targets/:id             # Get target
PUT  /api/targets/:id             # Update target
DEL  /api/targets/:id             # Delete target

POST /api/auth/register           # User registration
POST /api/auth/login              # User login
POST /api/auth/logout             # User logout
```

## User Roles

1. **Campaign Manager** - Full access
2. **Field Coordinator** - Can view/edit supporters in assigned wards
3. **Mobilizer** - Can view assigned supporters
4. **Finance Officer** - Can view/edit budget
5. **Viewer** - Read-only access

## Contributing

Contributions welcome! Please create a branch and submit a PR.

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, open a GitHub issue or contact the campaign team.

---

**Mi Win, Yu Win** 🇵🇬
