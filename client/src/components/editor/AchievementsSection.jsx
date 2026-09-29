import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Trophy } from 'lucide-react';

const AchievementsSection = ({ achievements = [], onChange }) => {
  const handleAdd = () => {
    const newEntry = {
      id: `ach_${Date.now()}`,
      title: '',
      description: '',
    };
    onChange([...achievements, newEntry]);
  };

  const handleUpdate = (id, field, value) => {
    onChange(
      achievements.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id) => {
    onChange(achievements.filter((item) => item.id !== id));
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;
    const reordered = [...achievements];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Achievements & Activities
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Showcase hackathon awards, academic honors, open source contributions, or leadership roles.
          </p>
        </div>

        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-strong)',
        }}>
          <Trophy size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No achievements added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>Add Achievement Entry</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {achievements.map((item, index) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Achievement Title (e.g. 1st Place - National Hackathon 2025)"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                    style={{ fontWeight: 600 }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, -1)}
                    className="btn btn-secondary btn-sm"
                    title="Move up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    disabled={index === achievements.length - 1}
                    onClick={() => handleMove(index, 1)}
                    className="btn btn-secondary btn-sm"
                    title="Move down"
                  >
                    <ArrowDown size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                    title="Delete achievement"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Optional description or metric (e.g. Competed against 150+ teams to develop an AI accessibility assistant)"
                value={item.description}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;
