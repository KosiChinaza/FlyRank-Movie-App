---
date: 2026-09-05
task: Implement AuthView.jsx — controlled email/password form driven by useAuthViewModel, Login/Create Account labeling by mode, disabled-while-loading submit, error display, mode toggle, styled with the existing dark cinematic tokens
category: ui
---

Implement:

src/pages/Auth/AuthView.jsx

Requirements:

- use useAuthViewModel
- display "Login" when mode is "login"
- display "Create Account" when mode is "register"
- add a controlled email input
- add a controlled password input
- add a submit button
- disable the submit button while loading
- display readable validation or Firebase errors
- add a button to switch between login and registration
- submit the form using onSubmit
- prevent the default browser form submission
- keep the styling consistent with the existing dark cinematic app design
- do not call Firebase directly
- do not import AuthModel or authService
- do not add routing yet
