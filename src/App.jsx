import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import WatchlistView from './pages/Watchlist/WatchlistView'
import AuthView from './pages/Auth/AuthView'
import useHomeViewModel from './pages/Home/useHomeViewModel.js'

function App() {
  const {
    query,
    setQuery,
    movies,
    loading,
    error,
    watchlistError,
    handleSearch,
    handleAddToWatchlist,
  } = useHomeViewModel()

  return (
    <>
      <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              query={query}
              movies={movies}
              loading={loading}
              error={error}
              watchlistError={watchlistError}
              onAddToWatchlist={handleAddToWatchlist}
            />
          }
        />
        <Route path="/watchlist" element={<WatchlistView />} />
        <Route path="/auth" element={<AuthView />} />
      </Routes>
    </>
  )
}

export default App
