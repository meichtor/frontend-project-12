import { BrowserRouter, Routes, Route } from 'react-router'
// import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
