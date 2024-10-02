import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Openroute from './utils/auth/OpenRoute'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import CloseRoute from './utils/auth/CloseRoute'
import Mytask from './pages/Mytask'

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={
          <CloseRoute>
            <Home />
          </CloseRoute>
        }
      />

      <Route
        path="/mytask"
        element={
          <CloseRoute>
            <Mytask />
          </CloseRoute>
        }
      />

      <Route
        path='/login'
        element={
          <Openroute>
            <Login />
          </Openroute>
        }
      />

      <Route
        path='/register'
        element={
          // <Openroute>
          <Register />
          // </Openroute>
        }
      />
    </Routes>
  )
}

export default App
