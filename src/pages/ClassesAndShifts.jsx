import React, { useState } from 'react';
import Classes from './Classes';
import Shifts from './Shifts';
import { BookOpen, Clock } from 'lucide-react';

const ClassesAndShifts = () => {
  const [activeTab, setActiveTab] = useState('classes');

  return (
    <div className="animate-fade-in">
      <div style={{ padding: '32px 32px 0' }}>
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <button 
            onClick={() => setActiveTab('classes')}
            style={{ 
              padding: '12px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              borderBottom: activeTab === 'classes' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'classes' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'classes' ? '600' : '400',
              background: 'none'
            }}
          >
            <BookOpen size={18} />
            Classes
          </button>
          <button 
            onClick={() => setActiveTab('shifts')}
            style={{ 
              padding: '12px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              borderBottom: activeTab === 'shifts' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'shifts' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'shifts' ? '600' : '400',
              background: 'none'
            }}
          >
            <Clock size={18} />
            Shifts
          </button>
        </div>
      </div>

      <div>
        {activeTab === 'classes' ? <Classes /> : <Shifts />}
      </div>
    </div>
  );
};

export default ClassesAndShifts;
