import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import AddStudent from './pages/AddStudent'
import ApiReference from './pages/ApiReference'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'))

    const handleLogin = (tok) => {
        localStorage.setItem('token', tok)
        setToken(tok)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    if (!token) return <Login onLogin={handleLogin} />

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
                <Sidebar onLogout={handleLogout} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Topbar />
                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/students" element={<Students />} />
                            <Route path="/add" element={<AddStudent />} />
                            <Route path="/edit/:id" element={<AddStudent />} />
                            <Route path="/api" element={<ApiReference />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App