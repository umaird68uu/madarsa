import React, { useState } from 'react';
import { BookOpen, User, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('principle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role
            }
          }
        });
        
        if (error) {
          setError(error.message);
        } else {
          setSuccessMsg('Account created successfully! You can now log in.');
          setIsSignUp(false); // Switch to login view
        }
        setLoading(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          setError(error.message);
          setLoading(false);
        } else {
          if (onLogin) onLogin(data.user);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="bg-gradient" style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 16px' }}>
            <BookOpen size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>Mahad Abul Hasan</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Madrasa Management System</p>
        </div>

        {error && (
          <div style={{ padding: '12px', background: '#fef2f2', color: '#ef4444', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {successMsg && (
          <div style={{ padding: '12px', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  style={{ paddingLeft: '40px' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                style={{ paddingLeft: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isSignUp ? 6 : undefined}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '12px 16px' }}>
              <option value="principle">Principle</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }} disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            {!loading && (isSignUp ? <UserPlus size={18} /> : <ArrowRight size={18} />)}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccessMsg(null);
            }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', padding: 0 }}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
