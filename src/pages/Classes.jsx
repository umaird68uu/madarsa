import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  AlertCircle,
  BookOpen,
  User as UserIcon,
  Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    section_id: '',
    shift_id: '',
    teacher_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch classes with relations
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select(`
          *,
          sections (id, name),
          shifts (id, name),
          profiles (id, name)
        `)
        .order('name', { ascending: true });

      if (classesError) throw classesError;
      setClasses(classesData || []);

      // Fetch sections
      const { data: sectionsData } = await supabase.from('sections').select('*');
      setSections(sectionsData || []);

      // Fetch shifts
      const { data: shiftsData } = await supabase.from('shifts').select('*');
      setShifts(shiftsData || []);

      // Fetch teachers
      const { data: teachersData } = await supabase.from('profiles').select('*').eq('role', 'teacher');
      setTeachers(teachersData || []);

    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const dataToSubmit = {
        name: formData.name,
        section_id: formData.section_id || null,
        shift_id: formData.shift_id || null,
        teacher_id: formData.teacher_id || null
      };

      if (editingId) {
        const { error } = await supabase
          .from('classes')
          .update(dataToSubmit)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('classes')
          .insert([dataToSubmit]);
        if (error) throw error;
      }

      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', section_id: '', shift_id: '', teacher_id: '' });
      fetchData();
    } catch (err) {
      setError('Operation failed: ' + err.message);
    }
  };

  const handleEdit = (cls) => {
    setFormData({
      name: cls.name,
      section_id: cls.section_id || '',
      shift_id: cls.shift_id || '',
      teacher_id: cls.teacher_id || ''
    });
    setEditingId(cls.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      setError('Failed to delete class: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '0 32px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} />
            Create New Class
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
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Class Name</label>
              <input 
                type="text" 
                placeholder="e.g., Grade 1-A" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Section</label>
              <select 
                value={formData.section_id}
                onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                required
              >
                <option value="">Select Section</option>
                {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Shift</label>
              <select 
                value={formData.shift_id}
                onChange={(e) => setFormData({ ...formData, shift_id: e.target.value })}
                required
              >
                <option value="">Select Shift</option>
                {shifts.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Teacher (Optional)</label>
              <select 
                value={formData.teacher_id}
                onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
              >
                <option value="">Assign Teacher</option>
                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button 
                type="button" 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                style={{ background: '#f1f5f9', color: 'var(--text)' }}
              >
                Cancel
              </button>
              <button type="submit" className="primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={18} />
                {editingId ? 'Update Class' : 'Create Class'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading classes...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {classes.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
              <BookOpen size={48} style={{ color: '#e2e8f0', marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-muted)' }}>No classes defined yet. Add your first class to get started.</p>
            </div>
          ) : (
            classes.map((cls) => (
              <div key={cls.id} className="card glass animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(55, 48, 163, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                      <Users size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: '700', fontSize: '1.125rem' }}>{cls.name}</h3>
                      <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: '#f1f5f9', borderRadius: '4px', color: 'var(--text-muted)' }}>
                        {cls.sections?.name || 'No Section'}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleEdit(cls)} style={{ background: 'none', padding: '6px', color: 'var(--text-muted)' }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(cls.id)} style={{ background: 'none', padding: '6px', color: '#ef4444' }}><Trash2 size={16} /></button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <Clock size={16} />
                    <span>Shift: {cls.shifts?.name || 'Unassigned'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <UserIcon size={16} />
                    <span>Teacher: {cls.profiles?.name || 'No Teacher Assigned'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Classes;
