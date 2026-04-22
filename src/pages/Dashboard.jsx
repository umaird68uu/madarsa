import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  CreditCard, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  BookOpen
} from 'lucide-react';

const StatCard = ({ title, value, subValue, icon: Icon, trend, trendValue }) => (
  <div className="card glass animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div className="bg-gradient" style={{ padding: '10px', borderRadius: '12px', color: 'white' }}>
        <Icon size={24} />
      </div>
      {trend && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          fontSize: '0.875rem', 
          color: trend === 'up' ? '#10b981' : '#ef4444',
          background: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          padding: '4px 8px',
          borderRadius: '20px'
        }}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{title}</h3>
    <div style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>{value}</div>
    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subValue}</p>
  </div>
);

const Dashboard = ({ userRole }) => {
  const isPrinciple = userRole === 'principle';
  const isTeacher = userRole === 'teacher';

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>
          Assalamu Alaikum, {isPrinciple ? 'Principle Sahab' : isTeacher ? 'Teacher' : 'Admin'}
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {isTeacher ? 'Here are your assigned classes for today.' : "Here's what's happening at Mahad Abul Hasan today."}
        </p>
      </header>

      {isTeacher ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <StatCard title="My Classes" value="3" subValue="Across 2 shifts" icon={BookOpen} />
          <StatCard title="My Students" value="85" subValue="Total enrolled" icon={Users} />
          <StatCard title="Pending Attendance" value="1" subValue="For today" icon={AlertCircle} trend="down" trendValue="Action Required" />
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '24px',
          marginBottom: '40px'
        }}>
          <StatCard title="Total Students" value="1,042" subValue="Active this academic year" icon={Users} trend="up" trendValue="12% vs last month" />
          <StatCard title="Average Attendance" value="94.2%" subValue="Across all shifts" icon={CalendarCheck} trend="up" trendValue="2.1%" />
          <StatCard title="Fees Collected" value="₹ 4.2L" subValue="Current installment cycle" icon={CreditCard} trend="down" trendValue="5% below target" />
          <StatCard title="Average Progress" value="8.4" subValue="Pages/Takhti per month" icon={TrendingUp} trend="up" trendValue="15%" />
        </div>
      )}

      {!isTeacher && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Activity</h2>
              <button style={{ color: 'var(--primary)', background: 'transparent', fontSize: '0.875rem' }}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9375rem', fontWeight: '500' }}>Teacher <span style={{ color: 'var(--primary)' }}>Ahmed Khan</span> marked attendance for Hifz Batch A</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>15 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card glass" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', color: 'white' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>AI Insights</h2>
            <p style={{ fontSize: '0.9375rem', opacity: 0.9, marginBottom: '24px', lineHeight: '1.6' }}>
              Gemini suggests that the Hifz section in the Afternoon shift is showing a 15% increase in memorization speed this month.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '0.875rem' }}>3 students in Edadiya are behind peers.</span>
            </div>
            <button style={{ width: '100%', marginTop: '24px', background: 'white', color: 'var(--primary)', padding: '12px' }}>
              Analyze Detailed Reports
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
