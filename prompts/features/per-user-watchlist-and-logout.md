---
date: 2026-09-05
task: Move the Watchlist to users/{userId}/watchlist/{imdbID} in firebaseService.js (addToWatchlist/removeFromWatchlist/getWatchlist take userId, throw when missing), thread user.uid through WatchlistModel and the Home/Watchlist ViewModels, and add a Logout button to Header driven by AuthContext
category: features
---

Update the existing Watchlist service so movies are stored under the signed-in user's profile.

Use this Realtime Database structure:

users/{userId}/watchlist/{imdbID}

Update the existing functions to receive userId:

- addToWatchlist(userId, movie)
- removeFromWatchlist(userId, imdbID)
- getWatchlist(userId)

Requirements:

- use userId as the parent user ID
- use imdbID as the unique Watchlist movie ID
- preserve the existing function behaviour
- update WatchlistModel and the relevant ViewModels so userId is passed through correctly
- get the current user from AuthContext/ViewModel level and pass user.uid down through the existing architecture
- do not use React hooks inside firebaseService or WatchlistModel
- do not access auth.currentUser inside firebaseService
- throw a readable error when userId is missing
- preserve the existing Realtime Database structure and functionality
- do not call Firebase directly from Views

Also add a Logout button to the existing Header.

Requirements:

- show Logout when a user is authenticated
- connect it to the existing logout function exposed by AuthContext
- after logout, the application should reflect the unauthenticated state
- preserve the existing Header design
- do not duplicate logout or authentication logic
- keep business/navigation logic in the appropriate ViewModel or context rather than the View where appropriate
