import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingIn from './components/landingIn'
import Landing from './components/landing'
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css'
import './styles/login.css'

function App() {


  return (
    <>
      <AuthProvider>{/* v IMMER HIER ZWISCHEN v */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<LandingIn />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </AuthProvider>{/* ^ IMMER HIER ZWISCHEN ^ */}
    </>
  )
}

export default App
