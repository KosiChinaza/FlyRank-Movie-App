---
date: 2026-09-05
task: Implement useAuthViewModel() — email/password/mode/loading/error state, handleSubmit() dispatching to AuthModel.login or AuthModel.register based on mode, toggleMode()
category: features
---

Implement the custom hook inside:

src/pages/Auth/useAuthViewModel.js

Manage with useState:

- email
- password
- mode, either "login" or "register"
- loading
- error

Create:

- handleSubmit()
- toggleMode()

Requirements:

- handleSubmit should call AuthModel.login when mode is "login"
- handleSubmit should call AuthModel.register when mode is "register"
- clear previous errors before submitting
- manage loading state correctly
- store readable errors
- clear the password after successful authentication
- toggleMode should switch between "login" and "register" and clear existing errors
- return all state and functions needed by AuthView
- do not render JSX
- do not call Firebase directly
- do not import authService directly
- do not modify AuthView yet
