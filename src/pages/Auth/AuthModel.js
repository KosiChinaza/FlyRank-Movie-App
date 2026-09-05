import { loginUser, logoutUser, registerUser } from '../../services/authService.js'

const MIN_PASSWORD_LENGTH = 6

/**
 * Trims and lowercases an email address.
 *
 * @param {string} email - The raw email address.
 * @returns {string} The normalized email address.
 */
function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

/**
 * Validates a normalized email and password before calling authService.
 *
 * @param {string} email - The normalized email address.
 * @param {string} password - The password.
 * @throws {Error} If email or password is empty, or the password is too short.
 */
function validateCredentials(email, password) {
  if (!email || !password) {
    throw new Error('Email and password are required.')
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`)
  }
}

/**
 * Registers a new user with a trimmed, normalized email and password.
 *
 * @param {string} email - The new user's email address.
 * @param {string} password - The new user's password.
 * @returns {Promise<import('firebase/auth').User>} The newly created Firebase user.
 * @throws {Error} If validation fails, or registration fails.
 */
export async function register(email, password) {
  const normalizedEmail = normalizeEmail(email)
  validateCredentials(normalizedEmail, password)

  return registerUser(normalizedEmail, password)
}

/**
 * Logs in a user with a trimmed, normalized email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<import('firebase/auth').User>} The signed-in Firebase user.
 * @throws {Error} If validation fails, or login fails.
 */
export async function login(email, password) {
  const normalizedEmail = normalizeEmail(email)
  validateCredentials(normalizedEmail, password)

  return loginUser(normalizedEmail, password)
}

/**
 * Logs out the currently authenticated user.
 *
 * @returns {Promise<void>}
 */
export async function logout() {
  return logoutUser()
}
