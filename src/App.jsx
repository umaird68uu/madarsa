import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Progress from './pages/Progress';
import AIInsights from './pages/AIInsights';
import ClassesAndShifts from './pages/ClassesAndShifts';
import Login from './pages/Login';


import { Search, Bell, User } from 'lucide-react';
import { supabase } from './lib/supabase';
import './index.css';

const TopBar = ({ user }) => (
  <div style={{ 
    height: '80px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0 32px',
    background: 'white',
    borderBottom: '1px solid #f1f5f9',
    position: 'sticky',
    top: 0,
    zIndex: 10
  }}>
    <div style={{ position: 'relative', width: '400px' }}>
      <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
      <input 
        type="text" 
        placeholder="Search students, teachers, or records..." 
        style={{ paddingLeft: '44px', background: '#f8fafc', border: 'none' }}
      />
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px', position: 'relative' }}>
        <Bell size={20} color="var(--text-muted)" />
        <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 4px 4px 16px', background: '#f8fafc', borderRadius: '12px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user?.name || 'User'}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.user_metadata?.role || 'principle'}</p>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <User size={20} />
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          ...session.user,
          role: session.user.user_metadata?.role || 'principle'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          ...session.user,
          role: session.user.user_metadata?.role || 'principle'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={(u) => setUser({ ...u, role: u.user_metadata?.role || 'principle' })} />;
  }

  const renderContent = () => {
    const role = user?.role || 'principle';
    
    // Check permissions
    const allowedTabs = {
      principle: ['dashboard', 'students', 'attendance', 'fees', 'progress', 'sections', 'teachers', 'ai-insights'],
      admin: ['dashboard', 'students', 'attendance', 'fees', 'progress', 'sections'],
      teacher: ['dashboard', 'attendance']
    };

    if (!allowedTabs[role]?.includes(activeTab)) {
      return (
        <div style={{ padding: '32px', textAlign: 'center', marginTop: '100px' }}>
          <h2 style={{ color: '#ef4444' }}>Access Denied</h2>
          <p style={{ color: 'var(--text-muted)' }}>You do not have permission to view this section.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={role} />;
      case 'students':
        return <Students />;
      case 'attendance':
        return <Attendance userRole={role} />;
      case 'fees':
        return <Fees />;
      case 'progress':
        return <Progress />;
      case 'sections':
        return <ClassesAndShifts />;
      case 'ai-insights':
        return <AIInsights />;
      default:


        return (
          <div style={{ padding: '32px', textAlign: 'center', marginTop: '100px' }}>
            <h2 style={{ color: 'var(--text-muted)' }}>This section ({activeTab}) is under construction.</h2>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={user?.role} onLogout={() => setUser(null)} />
      <main style={{ flex: 1, overflowY: 'auto', background: '#f8fafc' }}>
        <TopBar user={user} />
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;

