import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  GraduationCap,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

const AdmissionForm = ({ onCancel }) => {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>New Student Admission</h2>
          <p style={{ color: 'var(--text-muted)' }}>Enter the details for the new student enrollment.</p>
        </div>
        <button onClick={onCancel} style={{ background: '#f1f5f9', color: 'var(--text)' }}>Cancel</button>
      </div>

      <div className="card glass">
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Personal Information</h3>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Full Name (English)</label>
            <input type="text" placeholder="Enter student's English name" />
          </div>

          <div className="urdu-field">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>نام (Urdu)</label>
            <input type="text" className="urdu" placeholder="طالب علم کا نام درج کریں" dir="rtl" style={{ fontSize: '1.2rem' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Father's Name</label>
            <input type="text" placeholder="Enter father's name" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Student ID / Registration No.</label>
            <input type="text" placeholder="MAH-2024-XXXX" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Father's Mobile Number</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Personal Mobile (Optional)</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Date of Admission</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '16px' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Academic Allocation</h3>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Section</label>
            <select>
              <option>Edadiya</option>
              <option>Nazera</option>
              <option>Hifz</option>
              <option>Aalimiyat</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Shift</label>
            <select>
              <option>Morning (Fajr to Zuhr)</option>
              <option>Afternoon (Zuhr to Asr)</option>
              <option>Evening (Asr to Maghrib)</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onCancel} style={{ background: 'white', border: '1px solid #e2e8f0' }}>Save as Draft</button>
            <button type="submit" className="primary">Confirm Admission</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StudentProfile = ({ student, onBack }) => {
  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button onClick={onBack} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>{student.name_en}</h1>
            <span className="urdu" style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>{student.name_ur}</span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>{student.id_no} | {student.section} - {student.shift}</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card glass">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>Timeline & Notices</h2>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
                <AlertCircle size={16} /> Issue Red Notice
              </button>
              <button style={{ background: '#f0fdf4', color: '#10b981', border: '1px solid #86efac', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
                <CheckCircle2 size={16} /> Issue Green Notice
              </button>
            </div>

            <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '24px', marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-31px', top: '0', width: '14px', height: '14px', borderRadius: '50%', background: '#ef4444', border: '2px solid white' }}></div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#ef4444' }}>Red Notice Issued</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Continuous late arrival for Fajr shift.</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>2 days ago by Principle</p>
              </div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-31px', top: '0', width: '14px', height: '14px', borderRadius: '50%', background: '#10b981', border: '2px solid white' }}></div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#10b981' }}>Green Notice Issued</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Completed 5 paras beautifully.</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>1 month ago by Teacher Ahmed</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card glass">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={20} /> Shift Change
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Request Transfer To</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <option>Morning Shift</option>
                  <option>Afternoon Shift</option>
                  <option>Evening Shift</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Reason</label>
                <textarea rows="3" placeholder="Enter reason for shift change..." style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}></textarea>
              </div>
              <button className="primary" style={{ width: '100%' }}>Submit Application</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Students = () => {
  const [showAdmission, setShowAdmission] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  if (showAdmission) {
    return <AdmissionForm onCancel={() => setShowAdmission(false)} />;
  }

  if (selectedStudent) {
    return <StudentProfile student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>Student Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage, filter, and track all student records.</p>
        </div>
        <button onClick={() => setShowAdmission(true)} className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={20} />
          New Admission
        </button>
      </header>

      <div className="glass" style={{ padding: '24px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input type="text" placeholder="Search by name, ID, or phone..." style={{ paddingLeft: '40px', background: 'white' }} />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0' }}>
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Student</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Section & Shift</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Contact</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: '600', fontSize: '0.875rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: '1', name_en: 'Mohammad Zaid', name_ur: 'محمد زید', id_no: 'MAH-24-101', section: 'Hifz', shift: 'Morning', phone: '9876543210', status: 'Active' },
              { id: '2', name_en: 'Omar Farooq', name_ur: 'عمر فاروق', id_no: 'MAH-24-102', section: 'Edadiya', shift: 'Afternoon', phone: '9876543211', status: 'Active' },
              { id: '3', name_en: 'Hamza Malik', name_ur: 'حمزہ ملک', id_no: 'MAH-24-103', section: 'Nazera', shift: 'Evening', phone: '9876543212', status: 'Scholarship' },
            ].map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => setSelectedStudent(student)}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '700' }}>
                      {student.name_en[0]}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '0.9375rem' }}>{student.name_en}</p>
                      <p className="urdu" style={{ fontSize: '0.875rem', color: 'var(--primary)', lineHeight: '1.2' }}>{student.name_ur}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.id_no}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ padding: '4px 8px', background: 'rgba(6, 78, 59, 0.1)', color: 'var(--primary)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {student.section}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{student.shift}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.875rem' }}>{student.phone}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    background: student.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(180, 83, 9, 0.1)',
                    color: student.status === 'Active' ? '#10b981' : '#b45309'
                  }}>
                    {student.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', color: 'var(--text-muted)' }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '16px 24px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Showing 3 of 1,042 students</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '6px 12px', fontSize: '0.875rem' }}>Previous</button>
            <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '6px 12px', fontSize: '0.875rem' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
