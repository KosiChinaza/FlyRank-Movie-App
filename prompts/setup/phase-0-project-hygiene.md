---
date: 2026-11-12
task: Capstone Phase 0 — standardize the app name to CineScope, add a meta description, remove unused Firestore initialization, verify secrets are git-ignored, run lint and build
category: setup
---

We have completed the CineScope capstone readiness assessment.

Let's begin Phase 0: Project Hygiene and Baseline Preparation.

Decisions:
- Official application name: CineScope.
- Hosting platform: Vercel.
- Keep React, Vite, JavaScript, Firebase, OMDb, and the existing MVVM architecture.

Tasks:
1. Inspect the current Git status and identify any uncommitted changes.
2. Standardize the application name to CineScope in the visible UI, HTML title, package metadata, and README where appropriate.
3. Add an appropriate HTML meta description.
4. Identify unused Firestore imports, initialization, and other dead code.
5. Remove unused Firestore initialization only if you confirm no existing functionality depends on it.
6. Preserve authentication, movie search, Watchlist, routing, and all existing functionality.
7. Verify that environment files and API secrets are excluded from Git.
8. Run ESLint and a production build.
9. Report the exact files changed and whether the JavaScript bundle size improved.

Important:
- Do not add AI features yet.
- Do not install testing libraries yet.
- Do not change Firebase Realtime Database rules.
- Do not create a Git commit or tag yet.
- Do not overwrite unrelated uncommitted work.
- Do not change the project's architecture.
- Do not convert JavaScript to TypeScript.

Explain all changes and any remaining risks.
