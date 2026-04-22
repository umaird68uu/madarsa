import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  BrainCircuit,
  BarChart3,
  Lightbulb
} from 'lucide-react';

const AIInsights = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const insights = [
    {
      title: "Peer Comparison Analysis",
      description: "Students in Hifz Section A are memorizing 1.2 pages/day on average, which is 15% higher than last year's cohort.",
      icon: Users,
      color: "var(--primary)"
    },
    {
      title: "Attendance-Performance Correlation",
      description: "There is a strong correlation (0.85) between 100% attendance and 'Excellent' progress markings this month.",
      icon: BarChart3,
      color: "#b45309"
    },
    {
      title: "Early Warning: Retention Risk",
      description: "3 students in Edadiya have missed 2+ Takhtis this week. They may need additional support to catch up.",
      icon: AlertTriangle,
      color: "#ef4444"
    }
  ];

  return (
    <div style={{ padding: '32px' }}>
      <header style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div className="bg-gradient" style={{ padding: '8px', borderRadius: '10px', color: 'white' }}>
            <BrainCircuit size={24} />
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary)' }}>Gemini AI Insights</h1>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>Advanced student analytics and peer performance comparisons powered by Gemini 3.0 Flash.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div className="card glass" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Madrasa Intelligence Report</h2>
            <p style={{ opacity: 0.9, marginBottom: '24px', lineHeight: '1.6' }}>
              Overall academic health is <b>Excellent (88%)</b>. Memorization speed across Hifz batches has improved by 12% since the new academic year began.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', flex: 1 }}>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>BEST SECTION</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '700' }}>Hifz (Morning)</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', flex: 1 }}>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>AVG. ATTENDANCE</p>
                <p style={{ fontSize: '1.125rem', fontWeight: '700' }}>96.4%</p>
              </div>
            </div>
          </div>
          <Sparkles style={{ position: 'absolute', right: '-20px', bottom: '-20px', width: '200px', height: '200px', opacity: 0.1 }} />
        </div>

        <div className="card glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Lightbulb size={48} color="#b45309" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '8px' }}>Ask Gemini</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Generate custom reports or analyze specific student patterns.</p>
          <button className="primary" style={{ width: '100%' }}>Generate New Analysis</button>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>Key Observations</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {insights.map((insight, idx) => (
          <div key={idx} className="card glass animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: `${insight.color}20`, padding: '10px', borderRadius: '12px', color: insight.color }}>
                <insight.icon size={20} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{insight.title}</h3>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
