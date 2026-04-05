import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { studentService } from '../services/api'

export default function AddStudent() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [form, setForm] = useState({ name: '', email: '', age: '', course: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [apiErr, setApiErr] = useState('')

    useEffect(() => {
        if (isEdit) {
            studentService.getById(id).then(r => {
                const s = r.data.data
                setForm({ name: s.name, email: s.email, age: s.age, course: s.course })
            })
        }
    }, [id])

    const validate = () => {
        const e = {}
        if (!form.name || form.name.length < 2) e.name = 'Name is required (min 2 chars)'
        if (!form.email || !form.email.includes('@')) e.email = 'Valid email is required'
        if (!form.age || form.age < 1 || form.age > 120) e.age = 'Age must be between 1 and 120'
        if (!form.course || form.course.length < 2) e.course = 'Course is required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setLoading(true); setApiErr('')
        try {
            if (isEdit) await studentService.update(id, form)
            else await studentService.create(form)
            navigate('/students')
        } catch (err) {
            setApiErr(err.response?.data?.message || 'Something went wrong')
        } finally { setLoading(false) }
    }

    return (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', maxWidth: '600px', overflow: 'hidden' }}>
            <div style={{ padding: '13px 16px', borderBottom: '1px solid #e5e7eb', background: '#fafafa' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{isEdit ? 'Edit student' : 'Add new student'}</span>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {[
                        { key: 'name', label: 'Full name *', type: 'text', ph: 'e.g. Rahul Sharma' },
                        { key: 'email', label: 'Email address *', type: 'email', ph: 'e.g. rahul@example.com' },
                        { key: 'age', label: 'Age *', type: 'number', ph: '21' },
                        { key: 'course', label: 'Course *', type: 'text', ph: 'e.g. Computer Science' },
                    ].map(f => (
                        <div key={f.key}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                            <input
                                type={f.type}
                                placeholder={f.ph}
                                value={form[f.key]}
                                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                style={{ width: '100%', padding: '8px 10px', border: `1px solid ${errors[f.key] ? '#FCA5A5' : '#d1d5db'}`, borderRadius: '8px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                            />
                            {errors[f.key] && (
                                <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>{errors[f.key]}</div>
                            )}
                        </div>
                    ))}
                </div>

                {apiErr && (
                    <div style={{ fontSize: '12px', color: '#DC2626', marginTop: '12px', padding: '8px 12px', background: '#FEF2F2', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
                        {apiErr}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                    <button onClick={handleSubmit} disabled={loading}
                        style={{ padding: '8px 16px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {loading ? 'Saving...' : isEdit ? 'Save changes' : 'Add student'}
                    </button>
                    <button onClick={() => navigate('/students')}
                        style={{ padding: '8px 16px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}