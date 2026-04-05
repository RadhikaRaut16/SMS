import { useEffect, useState } from 'react'
import { studentService } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        studentService.getAll().then(r => setStudents(r.data.data || []))
    }, [])

    const sorted = [...students].sort((a, b) => b.id - a.id)
    const avg = students.length ? Math.round(students.reduce((s, x) => s + x.age, 0) / students.length) : 0
    const courses = new Set(students.map(s => s.course)).size

    return (
        <div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                    { label: 'Total students', val: students.length, sub: 'in database' },
                    { label: 'Average age', val: avg, sub: 'years' },
                    { label: 'Courses', val: courses, sub: 'distinct' },
                    { label: 'Latest added', val: sorted[0]?.name.split(' ')[0] || '—', sub: 'most recent' },
                ].map((s, i) => (
                    <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>{s.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1' }}>{s.val}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Recent students */}
            <div style={card}>
                <div style={cardHeader}>
                    <span style={cardTitle}>Recent students</span>
                    <button onClick={() => navigate('/students')} style={smBtn}>View all</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9fafb' }}>
                            {['Name', 'Email', 'Course', 'Age', 'Status'].map(h => (
                                <th key={h} style={th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.slice(0, 4).map(s => (
                            <tr key={s.id}>
                                <td style={td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={av}>{ini(s.name)}</div>{s.name}
                                    </div>
                                </td>
                                <td style={{ ...td, color: '#6b7280', fontSize: '12px' }}>{s.email}</td>
                                <td style={td}><span style={pill}>{s.course}</span></td>
                                <td style={td}>{s.age}</td>
                                <td style={td}>
                                    <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: '11px', padding: '2px 8px', borderRadius: '20px' }}>Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={card}>
                    <div style={cardHeader}><span style={cardTitle}>Students by course</span></div>
                    <div style={{ padding: '16px' }}>
                        {(() => {
                            const counts = {}
                            students.forEach(s => { counts[s.course] = (counts[s.course] || 0) + 1 })
                            const max = Math.max(...Object.values(counts), 1)
                            const colors = ['#185FA5', '#065F46', '#92400E', '#6D28D9', '#9F1239']
                            return Object.entries(counts).map(([course, count], i) => (
                                <div key={course} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                                        <span>{course}</span>
                                        <span style={{ color: '#6b7280' }}>{count}</span>
                                    </div>
                                    <div style={{ height: '7px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${Math.round((count / max) * 100)}%`, background: colors[i % colors.length], borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                            ))
                        })()}
                    </div>
                </div>

                <div style={card}>
                    <div style={cardHeader}><span style={cardTitle}>System info</span></div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { label: 'Backend', val: 'ASP.NET Core 8' },
                            { label: 'Database', val: 'SQL Server 2025' },
                            { label: 'Instance', val: 'SQLEXPRESS01' },
                            { label: 'ORM', val: 'Entity Framework Core 8' },
                            { label: 'Auth', val: 'JWT Bearer Token' },
                            { label: 'Logging', val: 'Serilog' },
                            { label: 'API Docs', val: 'Swagger / OpenAPI' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: '#6b7280' }}>{item.label}</span>
                                <span style={{ fontWeight: '500' }}>{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ini = n => n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }
const cardHeader = { padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', background: '#fafafa' }
const cardTitle = { fontSize: '13px', fontWeight: '600' }
const av = { width: '28px', height: '28px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '600', color: '#1D4ED8', flexShrink: 0 }
const td = { padding: '11px 14px', fontSize: '13px', borderBottom: '1px solid #f3f4f6' }
const th = { padding: '10px 14px', fontSize: '11px', fontWeight: '600', textAlign: 'left', color: '#6b7280', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }
const pill = { fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }
const smBtn = { padding: '4px 9px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', fontSize: '11px', cursor: 'pointer' }