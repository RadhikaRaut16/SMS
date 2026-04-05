import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../services/api'

export default function Students() {
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('')
    const [searchId, setSearchId] = useState('')
    const [foundStudent, setFoundStudent] = useState(null)
    const [idError, setIdError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => { load() }, [])

    const load = () => {
        studentService.getAll().then(r => setStudents(r.data.data || []))
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this student?')) return
        await studentService.delete(id)
        setFoundStudent(null)
        load()
    }

    const handleSearchById = async () => {
        if (!searchId) { setIdError('Please enter an ID'); return }
        setLoading(true); setIdError(''); setFoundStudent(null)
        try {
            const res = await studentService.getById(searchId)
            setFoundStudent(res.data.data)
        } catch (err) {
            setIdError(err.response?.status === 404 ? `No student found with ID ${searchId}` : 'Something went wrong')
        } finally { setLoading(false) }
    }

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.course.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            {/* Search by ID */}
            <div style={card}>
                <div style={cardHeader}>
                    <span style={cardTitle}>Search student by ID</span>
                    <span style={{ background: '#DBEAFE', color: '#1D4ED8', fontSize: '11px', padding: '3px 8px', borderRadius: '20px' }}>GET /api/students/{'{id}'}</span>
                </div>
                <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="number"
                            value={searchId}
                            onChange={e => setSearchId(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearchById()}
                            placeholder="Enter student ID e.g. 1"
                            style={{ flex: 1, padding: '8px 10px', border: `1px solid ${idError ? '#FCA5A5' : '#d1d5db'}`, borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                        />
                        <button onClick={handleSearchById} disabled={loading}
                            style={{ padding: '8px 16px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                        {(foundStudent || searchId) && (
                            <button onClick={() => { setSearchId(''); setFoundStudent(null); setIdError('') }}
                                style={{ padding: '8px 12px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '8px', cursor: 'pointer' }}>
                                Clear
                            </button>
                        )}
                    </div>
                    {idError && <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '6px' }}>{idError}</div>}

                    {foundStudent && (
                        <div style={{ marginTop: '14px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '10px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#1D4ED8' }}>
                                        {ini(foundStudent.name)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '15px' }}>{foundStudent.name}</div>
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>ID: {foundStudent.id}</div>
                                    </div>
                                </div>
                                <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>Found ✓</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                                {[
                                    { label: 'Email', value: foundStudent.email },
                                    { label: 'Course', value: foundStudent.course },
                                    { label: 'Age', value: foundStudent.age },
                                    { label: 'Created', value: foundStudent.createdDate?.slice(0, 10) },
                                ].map((item, i) => (
                                    <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px' }}>
                                        <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', marginBottom: '3px', textTransform: 'uppercase' }}>{item.label}</div>
                                        <div style={{ fontSize: '13px', fontWeight: '500' }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => navigate(`/edit/${foundStudent.id}`)}
                                    style={{ padding: '6px 14px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(foundStudent.id)}
                                    style={{ padding: '6px 14px', border: '1px solid #FCA5A5', background: '#fff', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', color: '#991B1B' }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* All Students Table */}
            <div style={card}>
                <div style={cardHeader}>
                    <span style={cardTitle}>All students</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search name, email, course..."
                            style={{ padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '12px', width: '220px', outline: 'none' }} />
                        <button onClick={() => navigate('/add')}
                            style={{ padding: '6px 12px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                            + Add new
                        </button>
                    </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9fafb' }}>
                            {['ID', 'Name', 'Email', 'Course', 'Age', 'Created', 'Actions'].map(h => (
                                <th key={h} style={th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>No students found</td></tr>
                        ) : filtered.map(s => (
                            <tr key={s.id}>
                                <td style={{ ...td, color: '#9ca3af', fontSize: '12px' }}>#{s.id}</td>
                                <td style={td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={av}>{ini(s.name)}</div>{s.name}
                                    </div>
                                </td>
                                <td style={{ ...td, color: '#6b7280', fontSize: '12px' }}>{s.email}</td>
                                <td style={td}><span style={pill}>{s.course}</span></td>
                                <td style={td}>{s.age}</td>
                                <td style={{ ...td, color: '#9ca3af', fontSize: '12px' }}>{s.createdDate?.slice(0, 10)}</td>
                                <td style={td}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button onClick={() => navigate(`/edit/${s.id}`)} style={editBtn}>Edit</button>
                                        <button onClick={() => handleDelete(s.id)} style={delBtn}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
const editBtn = { padding: '4px 9px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff', fontSize: '11px', cursor: 'pointer' }
const delBtn = { padding: '4px 9px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#fff', fontSize: '11px', cursor: 'pointer', color: '#991B1B' }