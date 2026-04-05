import { useState } from 'react'
import { authService } from '../services/api'

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ username: 'admin', password: 'Admin@123' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await authService.login(form)
            onLogin(res.data.data.token)
        } catch {
            setError('Invalid username or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '30px', width: '360px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#185FA5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>S</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '17px', fontWeight: '700' }}>Student Management</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Zest India IT Pvt Ltd</div>
                    </div>
                </div>

                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: '#1D4ED8', marginBottom: '16px' }}>
                    Demo: <strong>admin</strong> / <strong>Admin@123</strong>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label style={labelStyle}>Username</label>
                    <input style={inputStyle}
                        value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                        placeholder="Enter username" />
                </div>

                <div style={{ marginBottom: '6px' }}>
                    <label style={labelStyle}>Password</label>
                    <input style={inputStyle}
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        placeholder="Enter password"
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
                </div>

                {error && (
                    <div style={{ fontSize: '11px', color: '#DC2626', marginBottom: '8px' }}>{error}</div>
                )}

                <button onClick={handleSubmit} disabled={loading}
                    style={{ width: '100%', padding: '10px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', marginTop: '14px', fontFamily: 'inherit' }}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', marginTop: '12px' }}>
                    Secured with JWT · ASP.NET Core 8
                </div>
            </div>
        </div>
    )
}

const labelStyle = { fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '4px' }
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }