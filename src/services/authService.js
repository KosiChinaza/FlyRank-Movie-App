import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './firebaseService.js'

/**
 * Converts a Firebase Authentication error into a readable message.
 *
 * @param {unknown} error - The error thrown by the Firebase Auth SDK.
 * @returns {string} A readable error message.
 */
function getReadableAuthErrorMessage(error) {
  const code = error?.code

  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    default:
      return error?.message || 'Something went wrong. Please try again.'
  }
}

/**
 * Registers a new user with an email and password.
 *
 * @param {string} email - The new user's email address.
 * @param {string} password - The new user's password.
 * @returns {Promise<import('firebase/auth').User>} The newly created Firebase user.
 * @throws {Error} With a readable message if registration fails.
 */
export async function registerUser(email, password) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error) {
    throw new Error(getReadableAuthErrorMessage(error), { cause: error })
  }
}

/**
 * Signs in an existing user with an email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<import('firebase/auth').User>} The signed-in Firebase user.
 * @throws {Error} With a readable message if login fails.
 */
export async function loginUser(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error) {
    throw new Error(getReadableAuthErrorMessage(error), { cause: error })
  }
}

/**
 * Signs out the currently authenticated user.
 *
 * @returns {Promise<void>}
 * @throws {Error} With a readable message if sign-out fails.
 */
export async function logoutUser() {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(getReadableAuthErrorMessage(error), { cause: error })
  }
}

/**
 * Subscribes to Firebase authentication state changes.
 *
 * @param {(user: import('firebase/auth').User | null) => void} callback - Called with the current user, or null when signed out.
 * @returns {() => void} A function that unsubscribes the listener.
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback)
}
