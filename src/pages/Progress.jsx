import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  ChevronRight,
  BookOpen,
  Award,
  Zap,
  MessageSquare
} from 'lucide-react';

const Progress = () => {
  const [students, setStudents] = useState([
    { id: '1', name: 'Mohammad Zaid', name_ur: 'محمد زید', section: 'Hifz', last_entry: 'Page 42', current_target: 'Page 50', status: 'On Track' },
    { id: '2', name: 'Omar Farooq', name_ur: 'عمر فاروق', section: 'Edadiya', last_entry: 'Takhti 12', current_target: 'Takhti 15', status: 'Slow' },
    { id: '3', name: 'Hamza Malik', name_ur: 'حمزہ ملک', section: 'Nazera', last_entry: 'Page 15', current_target: 'Page 20', status: 'Excellent' },
  ]);

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>Academic Progress</h1>
          <p style={{ color: 'var(--text-muted)' }}>Section-specific tracking (Takhti & Quranic Pages).</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} />
            AI Performance Check
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="card glass">
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award color="#b45309" size={20} />
            Top Performers (This Month)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>{i}</div>
                  <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Student Name {i}</span>
                </div>
                <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.875rem' }}>+15 Pages</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card glass">
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp color="var(--primary)" size={20} />
            Section-wise Completion
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Hifz (Quran)</span>
                <span>72%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '72%', height: '100%', background: 'var(--primary)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Edadiya (Qaida)</span>
                <span>45%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: '#b45309' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card glass" style={{ padding: 0 }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input type="text" placeholder="Search by student or section..." style={{ paddingLeft: '40px' }} />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Student</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Section</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Current Status</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>AI Insight</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{student.name}</p>
                  <p className="urdu" style={{ fontSize: '0.8125rem', color: 'var(--primary)', lineHeight: '1' }}>{student.name_ur}</p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 8px', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>{student.section}</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{student.last_entry}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Goal: {student.current_target}</p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: student.status === 'Excellent' ? '#10b981' : student.status === 'Slow' ? '#ef4444' : 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: '600' }}>
                    <TrendingUp size={14} />
                    {student.status}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>Update</button>
                    <button style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'transparent', color: 'var(--primary)' }}><MessageSquare size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
