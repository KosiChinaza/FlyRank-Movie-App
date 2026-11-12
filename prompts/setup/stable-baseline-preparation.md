---
date: 2026-11-12
task: Prepare the first stable capstone baseline — version the Realtime Database rules, document Firebase setup in the README, verify secrets are excluded, lint, build, and review pending changes
category: setup
---

The CineScope Watchlist notifications have passed manual verification.

Prepare the project for its first stable capstone baseline.

Tasks:
1. Create database.rules.json containing the owner-only Firebase Realtime Database rules we have already published:
   - Authenticated users can read and write only users/{uid}/watchlist.
   - All other access is denied by default.
2. Verify the rules match the database paths used by the application.
3. Update README.md with Firebase Authentication setup, Realtime Database setup, and instructions for publishing the security rules.
4. Confirm .env files and credentials are excluded from Git.
5. Run npm run lint and npm run build.
6. Review git status and summarize all pending changes from Phase 0 and the Watchlist notification feature.
7. Do not alter existing application functionality.
8. Do not publish Firebase rules or create Git commits or tags automatically.

Report whether the project is ready for a baseline commit.
