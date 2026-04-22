import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Save
} from 'lucide-react';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('Hifz Batch A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showContinuousAbsent, setShowContinuousAbsent] = useState(false);

  // Mock data for students with attendance history
  const [students, setStudents] = useState([
    { id: '1', name_en: 'Mohammad Zaid', name_ur: 'محمد زید', history: ['present', 'present', 'absent'], status: 'present' },
    { id: '2', name_en: 'Omar Farooq', name_ur: 'عمر فاروق', history: ['present', 'leave', 'present'], status: 'present' },
    { id: '3', name_en: 'Hamza Malik', name_ur: 'حمزہ ملک', history: ['absent', 'absent', 'present'], status: 'present' },
    { id: '4', name_en: 'Abdul Rahman', name_ur: 'عبدالرحمٰن', history: ['present', 'present', 'present'], status: 'present' },
    { id: '5', name_en: 'Yusuf Ali', name_ur: 'یوسف علی', history: ['absent', 'absent', 'absent'], status: 'present' },
  ]);

  const filteredStudents = showContinuousAbsent 
    ? students.filter(s => s.history.join(',') === 'absent,absent,absent')
    : students;

  const toggleStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const getDotColor = (status) => {
    switch (status) {
      case 'present': return '#10b981';
      case 'absent': return '#ef4444';
      case 'leave': return '#f59e0b';
      default: return '#e2e8f0';
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>Attendance Marking</h1>
          <p style={{ color: 'var(--text-muted)' }}>Section: Hifz | Shift: Morning</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'white', padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ background: 'transparent', padding: '4px' }}><ChevronLeft size={16} /></button>
            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <button style={{ background: 'transparent', padding: '4px' }}><ChevronRight size={16} /></button>
          </div>
          <button className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={18} />
            Submit Attendance
          </button>
        </div>
      </header>

      <div className="glass" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>SELECT CLASS</label>
            <select style={{ width: '200px', padding: '8px 12px' }} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option>Hifz Batch A</option>
              <option>Hifz Batch B</option>
              <option>Edadiya Section 1</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid #e2e8f0', paddingLeft: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>24</p>
              <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>22</p>
              <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: '600' }}>PRESENT</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ef4444' }}>2</p>
              <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: '600' }}>ABSENT</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setShowContinuousAbsent(!showContinuousAbsent)}
            style={{ 
              background: showContinuousAbsent ? '#fee2e2' : 'white', 
              color: showContinuousAbsent ? '#ef4444' : 'inherit',
              border: `1px solid ${showContinuousAbsent ? '#ef4444' : '#e2e8f0'}`, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <Filter size={18} />
            {showContinuousAbsent ? 'Clear Filter' : '3 Days Absent'}
          </button>
        </div>
      </div>

      <div className="card glass" style={{ padding: 0 }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>STUDENT NAME</span>
          <span style={{ textAlign: 'center' }}>3-DAY HISTORY</span>
          <span style={{ textAlign: 'right' }}>MARK ATTENDANCE</span>
        </div>
        {filteredStudents.map((student) => (
          <div key={student.id} style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: '700', color: 'var(--primary)' }}>
                {student.name_en[0]}
              </div>
              <div>
                <p style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{student.name_en}</p>
                <p className="urdu" style={{ fontSize: '0.8125rem', color: 'var(--primary)', lineHeight: '1' }}>{student.name_ur}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
              {student.history.map((status, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: getDotColor(status)
                  }} 
                  title={status}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                onClick={() => toggleStatus(student.id, 'present')}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: student.status === 'present' ? '#10b981' : 'white',
                  color: student.status === 'present' ? 'white' : '#10b981',
                  border: '1px solid #10b981'
                }}
              >
                <CheckCircle2 size={14} /> Present
              </button>
              <button 
                onClick={() => toggleStatus(student.id, 'leave')}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: student.status === 'leave' ? '#f59e0b' : 'white',
                  color: student.status === 'leave' ? 'white' : '#f59e0b',
                  border: '1px solid #f59e0b'
                }}
              >
                <Clock size={14} /> Leave
              </button>
              <button 
                onClick={() => toggleStatus(student.id, 'absent')}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: student.status === 'absent' ? '#ef4444' : 'white',
                  color: student.status === 'absent' ? 'white' : '#ef4444',
                  border: '1px solid #ef4444'
                }}
              >
                <XCircle size={14} /> Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
