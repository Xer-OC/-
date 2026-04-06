# SocialFarm Mobile MVP Platform

SocialFarm is a mobile-first social universe prototype combining:
- unified short-video aggregation
- chat and social rooms
- cooperative cloud farming
- social graph (friends/requests/discovery)
- E2EE-ready messaging architecture

## Stack
- React Native + Expo + TypeScript
- React Navigation
- Zustand (auth/session state)
- Reanimated
- Axios
- AsyncStorage
- tweetnacl + expo-secure-store

## Tabs
- Home
- Feed
- Rooms
- Farm
- Messages
- Playground (development only)

## Core Modules

### Identity/Auth (`src/auth/`)
- `authService.ts`: login/logout/session persistence with AsyncStorage
- `authStore.ts`: Zustand store for app auth state

### Video Feed (`src/videoSources/`, `src/services/videoFeedService.ts`)
- Adapter interface + mock adapters:
  - Douyin
  - Kuaishou
  - Xiaohongshu
- Unified feed aggregation + shuffle

### Chat + E2EE (`src/crypto/`, `src/screens/messages/*`, `src/screens/rooms/*`)
- NaCl key generation/encryption/decryption
- Secure private key storage with SecureStore
- Public key exchange mapping service
- Encrypted room mode + lock indicator

### Social Graph (`src/models/Friendship.ts`, `src/services/friendService.ts`, `src/screens/FriendsScreen.tsx`)
- friend requests
- accept/reject flows
- friends list
- discover users

### Presence (`src/models/Presence.ts`, `src/services/presenceService.ts`)
- online/offline/activity presence model
- mock subscription structure for realtime updates

### Farm/Economy/Items
- farm gameplay screens + farm card
- `economyService.ts` wallet coin actions
- `itemService.ts` item catalog access

### Search/Notifications/Invites/Activity
- `SearchScreen.tsx` + `searchService.ts`
- `NotificationsScreen.tsx` + `notificationService.ts`
- `inviteService.ts`
- `ActivityFeedScreen.tsx`

### Moderation/Permissions/Sync/Share/Analytics
- `moderationService.ts` (block/report)
- `permissionService.ts` (role/action checks)
- `syncService.ts` (profile/friends/room/farm sync stubs)
- `shareService.ts` (native share)
- `analyticsService.ts` event tracking

## Run

```bash
npm install
npm run start
```

Checks:

```bash
npm run typecheck
npm run lint
```

Realtime service:

```bash
npm run realtime
```

## Security Note
The included E2EE layer is an MVP simplification. Production deployment requires forward secrecy, key rotation, multi-device sync, and strong identity verification.


## VS Code Quick Start
1. Open `socialfarm.code-workspace` in VS Code.
2. Run the task **Install Dependencies**.
3. Start the app with the launch profile **Run Expo Web** or the task **Start Expo Web**.
4. Optional checks:
   - **Typecheck**
   - **Lint**
