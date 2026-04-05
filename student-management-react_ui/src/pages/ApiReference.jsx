const endpoints = [
    { method: 'POST', path: '/api/auth/login', desc: 'Get JWT token', style: { background: '#DBEAFE', color: '#1D4ED8' } },
    { method: 'GET', path: '/api/students', desc: 'Get all students', style: { background: '#D1FAE5', color: '#065F46' } },
    { method: 'GET', path: '/api/students/{id}', desc: 'Get by ID', style: { background: '#D1FAE5', color: '#065F46' } },
    { method: 'POST', path: '/api/students', desc: 'Create student', style: { background: '#DBEAFE', color: '#1D4ED8' } },
    { method: 'PUT', path: '/api/students/{id}', desc: 'Update student', style: { background: '#FEF3C7', color: '#92400E' } },
    { method: 'DELETE', path: '/api/students/{id}', desc: 'Delete student', style: { background: '#FEE2E2', color: '#991B1B' } },
]

const tags = ['ASP.NET Core 8', 'C#', 'Entity Framework Core 8', 'SQL Server 2025', 'JWT Bearer', 'Serilog', 'Swagger/OpenAPI', 'Repository Pattern', 'Layered Architecture', 'Global Exception Middleware']

export default function ApiReference() {
    return (
        <div>
            <div style={card}>
                <div style={cardHeader}>
                    <span style={cardTitle}>API endpoints</span>
                    <span style={{ background: '#DBEAFE', color: '#1D4ED8', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>JWT required except /login</span>
                </div>
                <div style={{ padding: '4px 16px' }}>
                    {endpoints.map((e, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < endpoints.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                            <span style={{ ...e.style, fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '5px', minWidth: '60px', textAlign: 'center' }}>{e.method}</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{e.path}</span>
                            <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: 'auto' }}>{e.desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={card}>
                <div style={cardHeader}><span style={cardTitle}>Sample login request</span></div>
                <div style={{ padding: '16px' }}>
                    <pre style={{ fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.7', color: '#111', background: '#f9fafb', padding: '14px', borderRadius: '8px', overflow: 'auto' }}>
                        {`POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123"
}

Response 200 OK:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1...",
    "username": "admin",
    "role": "Admin",
    "expiresAt": "2026-04-05T..."
  }
}`}
                    </pre>
                </div>
            </div>

            <div style={card}>
                <div style={cardHeader}><span style={cardTitle}>Tech stack</span></div>
                <div style={{ padding: '16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tags.map(t => (
                        <span key={t} style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '20px', background: '#f3f4f6', border: '1px solid #e5e7eb' }}>{t}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }
const cardHeader = { padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', background: '#fafafa' }
const cardTitle = { fontSize: '13px', fontWeight: '600' }