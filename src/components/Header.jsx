import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import './Header.css'

const NAV_LINKS = [
  { label: 'Discover', to: '/' },
  { label: 'Watchlist', to: '/watchlist' },
]

function Header({ query, setQuery, handleSearch }) {
  const { pathname } = useLocation()
  const { user, logout } = useContext(AuthContext)

  function handleSubmit(event) {
    event.preventDefault()
    handleSearch()
  }

  function handleLogout() {
    logout().catch(() => {})
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">
          <span className="header__brand-name">
            Cine<span className="header__brand-accent">Scope</span>
          </span>
          <span className="header__brand-tag">app</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                pathname === link.to
                  ? 'header__nav-link header__nav-link--active'
                  : 'header__nav-link'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form className="header__search" role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            className="header__search-input"
            placeholder="Search movies..."
            aria-label="Search movies"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="header__search-button">
            Search
          </button>
        </form>

        {user ? (
          <button type="button" className="header__signin" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" className="header__signin">
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
