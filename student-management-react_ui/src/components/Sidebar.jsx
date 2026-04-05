import { useNavigate, useLocation } from 'react-router-dom'

const links = [
    { path: '/', label: 'Dashboard', color: '#185FA5' },
    { path: '/students', label: 'Students', color: '#065F46' },
    { path: '/add', label: 'Add student', color: '#92400E' },
    { path: '/api', label: 'API reference', color: '#6D28D9' },
]

export default function Sidebar({ onLogout }) {
    const nav = useNavigate()
    const loc = useLocation()

    return (
        <div style={{ width: '230px', background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ padding: '18px 16px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ width: '36px', height: '36px', background: '#185FA5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>S</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700' }}>Student Management</div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>Zest India IT Pvt Ltd</div>
            </div>

            <div style={{ padding: '10px 8px', flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: '600', color: '#9ca3af', padding: '8px 10px 4px', letterSpacing: '0.06em' }}>MAIN</div>
                {links.map(l => (
                    <button key={l.path} onClick={() => nav(l.path)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px',
                            borderRadius: '8px', cursor: 'pointer',
                            color: loc.pathname === l.path ? '#1D4ED8' : '#6b7280',
                            background: loc.pathname === l.path ? '#EFF6FF' : 'transparent',
                            fontWeight: loc.pathname === l.path ? '600' : '400',
                            fontSize: '13px', marginBottom: '2px', border: 'none',
                            width: '100%', textAlign: 'left', fontFamily: 'inherit'
                        }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: l.color, flexShrink: 0 }}></div>
                        {l.label}
                    </button>
                ))}
            </div>

            <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: '#1D4ED8' }}>AD</div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>admin</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>Administrator</div>
                    </div>
                </div>
                <button onClick={onLogout}
                    style={{ width: '100%', padding: '6px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Sign out
                </button>
            </div>
        </div>
    )
}