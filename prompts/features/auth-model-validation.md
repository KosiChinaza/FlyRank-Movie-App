---
date: 2026-09-05
task: Implement AuthModel.js — register(email, password)/login(email, password)/logout() with email normalization and email/password validation, delegating to authService.js
category: features
---

Implement:

src/pages/Auth/AuthModel.js

Import the authentication functions from authService.js.

Create and export:

- register(email, password)
- login(email, password)
- logout()

Requirements:

- trim and normalize the email address
- validate that email and password are not empty
- validate that password is at least 6 characters
- call the corresponding authService function
- return the authenticated Firebase User where applicable
- do not use React hooks
- do not call Firebase Authentication directly outside authService.js
- do not manage loading, error, or other UI state
- do not modify AuthView or useAuthViewModel yet
