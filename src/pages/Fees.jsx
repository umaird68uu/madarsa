import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Download, 
  Filter,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';

const Fees = () => {
  const [students, setStudents] = useState([
    { id: '1', name: 'Mohammad Zaid', id_no: 'MAH-24-101', total: 5000, paid: 2500, installments: [1250, 1250, 0, 0], status: 'Partial' },
    { id: '2', name: 'Omar Farooq', id_no: 'MAH-24-102', total: 5000, paid: 5000, installments: [1250, 1250, 1250, 1250], status: 'Paid' },
    { id: '3', name: 'Hamza Malik', id_no: 'MAH-24-103', total: 5000, paid: 0, installments: [0, 0, 0, 0], status: 'Overdue' },
    { id: '4', name: 'Abdul Rahman', id_no: 'MAH-24-104', total: 5000, paid: 1250, installments: [1250, 0, 0, 0], status: 'Partial' },
  ]);

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>Fee Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track installments, pending dues, and scholarships.</p>
        </div>
        <button className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} />
          Record Payment
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="card glass" style={{ borderLeft: '4px solid #10b981' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Expected</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹ 52,10,000</p>
        </div>
        <div className="card glass" style={{ borderLeft: '4px solid var(--primary)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Collected</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹ 34,25,500</p>
        </div>
        <div className="card glass" style={{ borderLeft: '4px solid #ef4444' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Pending Dues</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹ 17,84,500</p>
        </div>
      </div>

      <div className="glass" style={{ padding: '24px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input type="text" placeholder="Search by student name or ID..." style={{ paddingLeft: '40px', background: 'white' }} />
        </div>
        <button style={{ background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} />
          Status
        </button>
        <button style={{ background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="card glass" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Student</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Installments (Q1-Q4)</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Paid</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Remaining</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{student.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.id_no}</p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {student.installments.map((inst, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          fontWeight: '700',
                          background: inst > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: inst > 0 ? '#10b981' : '#ef4444',
                          border: `1px solid ${inst > 0 ? '#10b981' : '#ef4444'}`
                        }}
                        title={`Q${idx + 1}: ₹${inst}`}
                      >
                        {inst > 0 ? '✓' : idx + 1}
                      </div>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontWeight: '600' }}>₹ {student.paid}</td>
                <td style={{ padding: '16px 24px', color: student.total - student.paid > 0 ? '#ef4444' : 'var(--text-muted)' }}>
                  ₹ {student.total - student.paid}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    background: student.status === 'Paid' ? 'rgba(16, 185, 129, 0.1)' : student.status === 'Overdue' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(180, 83, 9, 0.1)',
                    color: student.status === 'Paid' ? '#10b981' : student.status === 'Overdue' ? '#ef4444' : '#b45309'
                  }}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
