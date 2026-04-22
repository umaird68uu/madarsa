import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    start_time: '',
    end_time: ''
  });

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('shifts')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setShifts(data || []);
    } catch (err) {
      setError('Failed to fetch shifts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('shifts')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('shifts')
          .insert([formData]);
        if (error) throw error;
      }

      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', start_time: '', end_time: '' });
      fetchShifts();
    } catch (err) {
      setError('Operation failed: ' + err.message);
    }
  };

  const handleEdit = (shift) => {
    setFormData({
      name: shift.name,
      start_time: shift.start_time,
      end_time: shift.end_time
    });
    setEditingId(shift.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shift?')) return;
    
    try {
      const { error } = await supabase
        .from('shifts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchShifts();
    } catch (err) {
      setError('Failed to delete shift: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '0 32px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} />
            Add New Shift
          </button>
        )}
      </div>


      {error && (
        <div style={{ padding: '16px', background: '#fef2f2', color: '#ef4444', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {isAdding && (
        <div className="card glass animate-fade-in" style={{ marginBottom: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Shift Name</label>
              <input 
                type="text" 
                placeholder="e.g., Morning Shift" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Start Time</label>
              <input 
                type="time" 
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>End Time</label>
              <input 
                type="time" 
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <Save size={18} />
                {editingId ? 'Update' : 'Save'}
              </button>
              <button 
                type="button" 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                style={{ background: '#f1f5f9', color: 'var(--text)', flex: 1 }}
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading shifts...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {shifts.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
              <Clock size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-muted)' }}>No shifts defined yet. Add your first shift to get started.</p>
            </div>
          ) : (
            shifts.map((shift) => (
              <div key={shift.id} className="card glass animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(55, 48, 163, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{shift.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleEdit(shift)}
                    style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', color: 'var(--text-muted)' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(shift.id)}
                    style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', color: '#ef4444' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Shifts;
