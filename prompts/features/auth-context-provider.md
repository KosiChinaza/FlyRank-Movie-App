---
date: 2026-09-05
task: Create AuthContext.jsx — AuthProvider subscribes to authService.subscribeToAuthChanges, exposes user/authLoading/logout, blocks rendering with a loading state until the initial session is restored, unsubscribes on unmount; wrap the app with it in main.jsx
category: features
---

Create a global authentication context.

Create:

src/context/AuthContext.jsx

Requirements:

- use subscribeToAuthChanges from authService.js to listen for Firebase authentication changes
- store the current Firebase user
- store authLoading while Firebase restores the session
- expose:
  - user
  - authLoading
  - logout
- create and export AuthProvider
- wrap the application with AuthProvider
- unsubscribe from the authentication listener when the provider unmounts
- show a loading state while authentication is being initialized
- use the existing logout function from authService
- do not call Firebase Authentication directly from AuthContext
- do not add Watchlist logic
- do not add TypeScript interfaces or types such as AuthProviderProps
- if shared application types already exist, keep them in the existing /types structure rather than defining duplicate types inside AuthContext
- preserve the existing Home, search, Watchlist, and Firebase functionality
