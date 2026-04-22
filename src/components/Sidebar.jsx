import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  BookOpen,
  UserCheck,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../index.css';

const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['principle', 'admin', 'teacher'] },
    { id: 'students', label: 'Students', icon: Users, roles: ['principle', 'admin'] },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, roles: ['principle', 'admin', 'teacher'] },
    { id: 'fees', label: 'Fees & Payments', icon: CreditCard, roles: ['principle', 'admin'] },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp, roles: ['principle', 'admin'] },
    { id: 'sections', label: 'Classes & Shifts', icon: BookOpen, roles: ['principle', 'admin'] },
    { id: 'teachers', label: 'Teachers', icon: UserCheck, roles: ['principle'] },
    { id: 'ai-insights', label: 'AI Insights', icon: MessageSquare, roles: ['principle'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className={`sidebar glass ${isOpen ? 'open' : 'closed'}`} style={{ 
      height: '100vh', 
      width: isOpen ? '280px' : '80px',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'sticky',
      top: 0
    }}>
      <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 12px' }}>
        <div className="logo bg-gradient" style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <BookOpen size={24} />
        </div>
        {isOpen && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>Mahad Abul Hasan</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nanded</p>
          </div>
        )}
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              marginBottom: '8px',
              background: activeTab === item.id ? 'var(--primary)' : 'transparent',
              color: activeTab === item.id ? 'white' : 'var(--text)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              justifyContent: isOpen ? 'flex-start' : 'center'
            }}
          >
            <item.icon size={20} />
            {isOpen && <span style={{ fontWeight: '500' }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          onClick={handleLogout}
          style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          width: '100%', 
          padding: '12px', 
          color: '#ef4444', 
          background: 'transparent',
          justifyContent: isOpen ? 'flex-start' : 'center'
        }}>
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
