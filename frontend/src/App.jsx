import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('auth_token')
  const location = useLocation()
  return (
    authToken ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>\
          <Route index element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
