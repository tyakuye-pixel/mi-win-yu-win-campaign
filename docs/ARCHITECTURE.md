# Mi Win Yu Win - Architecture Documentation

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────┐ │
│  │  React Native    │  │   React Web      │  │  Android  │ │
│  │  (Expo)          │  │   (Expo Web)     │  │   Native  │ │
│  └──────┬───────────┘  └────────┬─────────┘  └─────┬─────┘ │
│         │                      │                    │       │
│         └──────────────────────┼────────────────────┘       │
│                                │                             │
└────────────────────────────────┼─────────────────────────────┘
                                 │ HTTP/HTTPS
┌────────────────────────────────┼─────────────────────────────┐
│                    API Gateway & Load Balancer               │
│                         (Express.js)                         │
└────────────────────────────────┼─────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────────┐
        │                        │                            │
   ┌────▼────────┐    ┌──────────▼──────────┐    ┌───────────▼──────┐
   │ Auth Routes │    │ Business Logic      │    │ WebSocket Server │
   │ /auth       │    │ /supporters         │    │ (Real-time sync) │
   │ /login      │    │ /volunteers         │    │                  │
   │ /register   │    │ /targets            │    │                  │
   └────┬────────┘    │ /budget             │    └────┬──────────────┘
        │             │ /analytics          │         │
        │             └──────────┬──────────┘         │
        │                        │                    │
        └────────────────────────┼────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────┐
        │                        │                    │
   ┌────▼──────────┐    ┌────────▼────────┐   ┌──────▼──────┐
   │ Firebase Auth │    │ Firebase        │   │ PostgreSQL  │
   │ & JWT         │    │ Realtime DB     │   │ (Optional)  │
   │               │    │                 │   │             │
   └───────────────┘    └─────────────────┘   └─────────────┘

                    ┌──────────────────────────┐
                    │   Cloud Storage          │
                    │ (Backups & Exports)      │
                    └──────────────────────────┘
```

## Data Flow

### User Registration & Authentication

1. User fills registration form in mobile/web app
2. Client sends credentials to `/api/auth/register`
3. Backend validates input and creates user in Firebase Auth
4. Backend generates JWT token
5. Token stored in Redux + AsyncStorage (mobile) / localStorage (web)
6. User redirected to dashboard

### Real-Time Data Synchronization

```
Mobile App                Backend                   Database
   │                         │                          │
   ├─ Create Supporter ──────►─ Validate ────────────────┼──► Save
   │                         │                          │
   │                    Broadcast to all connected clients
   │                         │                          │
   │◄─ Firebase Listener ────┼─ WebSocket Update ◄──────┤
   │                         │                          │
   └─ Redux Update           │                          │
   └─ Local Refresh          │                          │
```

### Offline Sync Queue

```
Offline Mode                 Online Mode
   │                           │
   ├─ User Action ──────────►  ├─ Queue Stored
   │  (Create/Update)          │
   │                           ├─ Sync Service Wakes Up
   ├─ Store in Queue ◄─────────┤
   │  (AsyncStorage)           ├─ Send Queued Items
   │                           │
   └─ UI Updated Optimistically│◄─ Receive Response
                               │
                          ├─ Mark as Synced
                          ├─ Update Timestamp
                          └─ Notify User
```

## Database Schema

### Users Collection
```
users: {
  uid: string (Firebase Auth UID),
  email: string,
  fullName: string,
  role: 'admin' | 'coordinator' | 'mobilizer' | 'finance' | 'viewer',
  ward: string (assigned ward),
  phone: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean,
  permissions: string[]
}
```

### Supporters Collection
```
supporters: {
  id: string (SUP-001),
  name: string,
  phone: string,
  llg: string,
  ward: string,
  preference: '1st' | '2nd' | '3rd',
  status: 'Confirmed' | 'Leaning' | 'Uncertain',
  mobilizer: string,
  notes: string,
  lastContactDate: timestamp,
  createdBy: string (user uid),
  createdAt: timestamp,
  updatedAt: timestamp,
  syncedAt: timestamp
}
```

### Volunteers Collection
```
volunteers: {
  id: string (VOL-001),
  name: string,
  llg: string,
  ward: string,
  role: string,
  phone: string,
  notes: string,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Targets Collection
```
targets: {
  id: string (T-001),
  llg: string,
  ward: string,
  goal: number,
  notes: string,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Budget Collections
```
expenses: {
  id: string,
  date: timestamp,
  category: string,
  description: string,
  amount: number,
  responsiblePerson: string,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}

income: {
  id: string,
  date: timestamp,
  source: string,
  amount: number,
  receivedBy: string,
  notes: string,
  createdBy: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Security Considerations

1. **Authentication**: Firebase Auth with JWT tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Data Encryption**: HTTPS/TLS for all communications
4. **Rate Limiting**: 100 requests per 15 minutes per IP
5. **Input Validation**: Joi schema validation on all inputs
6. **CORS**: Configured for frontend domains only
7. **Sensitive Data**: Phone numbers, emails not exposed in lists
8. **Audit Log**: All changes logged with user ID and timestamp

## Deployment Strategy

### Development
- Local Firebase Emulator
- Expo Dev Client
- Hot Module Reloading

### Staging
- Firebase Staging Project
- Cloud Run / Heroku for backend
- TestFlight for iOS, Internal Testing for Android

### Production
- Firebase Production Project
- Cloud Run / AWS ECS for backend
- Google Play Store & App Store deployment
- CDN for static assets

## Performance Optimization

1. **Caching**: Redux selectors with memoization
2. **Lazy Loading**: Route-based code splitting
3. **Database Indexing**: On frequently queried fields
4. **Pagination**: List views paginated (50 items/page)
5. **Image Optimization**: Compressed profile photos
6. **Bundle Size**: Tree-shaking & minification

## Error Handling

- Client-side error boundaries (React)
- Server-side try-catch with logging
- User-friendly error messages
- Automatic retry with exponential backoff
- Sentry integration for error tracking
