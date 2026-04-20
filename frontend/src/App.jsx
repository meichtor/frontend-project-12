import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router'
import ChatPage from './pages/Chat'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { useSelector } from 'react-redux'
import SignUp from './pages/SignUp'
import ChatModal from './components/modals/ChatModal'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const isAuth = useSelector(state => !!state.user.token)
  return (
    isAuth ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <ChatModal />
      <Routes>
        <Route path="/" element={<Layout />}>\
          <Route index element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
