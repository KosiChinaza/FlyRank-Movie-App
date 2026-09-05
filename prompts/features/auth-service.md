---
date: 2026-09-05
task: Create authService.js — registerUser/loginUser/logoutUser/subscribeToAuthChanges wrapping Firebase Auth from firebaseService.js, with readable error messages, no UI yet
category: features
---

Create:

src/services/authService.js

Implement and export:

- registerUser(email, password)
- loginUser(email, password)
- logoutUser()
- subscribeToAuthChanges(callback)

Requirements:

- use Firebase Authentication from the existing firebaseService.js
- use createUserWithEmailAndPassword for registration
- use signInWithEmailAndPassword for login
- use signOut for logout
- use onAuthStateChanged inside subscribeToAuthChanges
- return the Firebase user data where appropriate
- convert Firebase errors into clear, readable messages
- do not use React hooks
- do not use useState or useEffect
- do not render JSX
- do not add login or registration UI yet
- keep all authentication communication inside authService.js
