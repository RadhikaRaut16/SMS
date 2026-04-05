export default function Topbar() {
    return (
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '15px', fontWeight: '700' }}>Student Management System</span>
            <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>JWT Active</span>
                <span style={{ background: '#DBEAFE', color: '#1D4ED8', fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>ASP.NET Core 8</span>
                <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '11px', padding: '3px 8px', borderRadius: '20px', fontWeight: '500' }}>SQL Server 2025</span>
            </div>
        </div>
    )
}