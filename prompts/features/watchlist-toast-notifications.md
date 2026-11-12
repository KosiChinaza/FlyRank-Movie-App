---
date: 2026-11-12
task: Add accessible toast notifications for Watchlist add/remove success and failure, with duplicate-submission protection
category: features
---

We have successfully secured Firebase Realtime Database, and CineScope users can now add and remove movies from their Watchlist.

However, the application doesn't display confirmation when a movie is added or removed.

Please improve this existing functionality.

Requirements:
1. Inspect the current Watchlist implementation and identify where add/remove operations are handled.
2. Add small, accessible toast notifications for successful additions and removals.
3. Show a clear error notification if Firebase fails to save or remove a movie.
4. Display the movie title in success notifications where available.
5. Only show success after Firebase confirms the operation.
6. Prevent duplicate submissions while an operation is pending.
7. Make notifications mobile-friendly and visually consistent with CineScope's existing dark/yellow design.
8. Use appropriate screen-reader announcements, without interrupting keyboard focus.
9. Preserve the existing Firebase architecture and database security rules.
10. Do not add unrelated features or change the application architecture.
11. Run ESLint and the production build.

Report which files changed and how the notifications were tested.

Do not create a Git commit yet.
