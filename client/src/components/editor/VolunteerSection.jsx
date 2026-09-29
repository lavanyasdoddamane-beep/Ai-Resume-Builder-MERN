import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, HeartHandshake } from 'lucide-react';

const VolunteerSection = ({ volunteerExperience = [], onChange }) => {
  const [expandedId, setExpandedId] = useState(volunteerExperience.length > 0 ? volunteerExperience[0].id : null);

  const handleAdd = () => {
    const newEntry = {
      id: `vol_${Date.now()}`,
      organization: '',
      role: '',
      dates: '',
      description: '',
    };
    onChange([...volunteerExperience, newEntry]);
    setExpandedId(newEntry.id);
  };

  const handleUpdate = (id, field, value) => {
    onChange(
      volunteerExperience.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id) => {
    onChange(volunteerExperience.filter((item) => item.id !== id));
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= volunteerExperience.length) return;
    const reordered = [...volunteerExperience];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Volunteer Experience
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Community engagement, tech community volunteering, or mentoring initiatives.
          </p>
        </div>

        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>Add Volunteer Work</span>
        </button>
      </div>

      {volunteerExperience.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-strong)',
        }}>
          <HeartHandshake size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No volunteer experience added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>Add Volunteer Entry</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {volunteerExperience.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xs)',
                  overflow: 'hidden',
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    padding: '0.875rem 1.25rem',
                    backgroundColor: isExpanded ? '#f8fafc' : '#ffffff',
                    borderBottom: isExpanded ? '1px solid var(--border-subtle)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                      {item.role || 'Volunteer Role'}
                    </span>
                    {item.organization && (
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        at {item.organization}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
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
                      disabled={index === volunteerExperience.length - 1}
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
                      title="Delete entry"
                    >
                      <Trash2 size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                {isExpanded && (
                  <div style={{ padding: '1.25rem' }}>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Role</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Student Mentor / Open Source Contributor"
                          value={item.role}
                          onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Organization</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. FreeCodeCamp / IEEE Student Branch"
                          value={item.organization}
                          onChange={(e) => handleUpdate(item.id, 'organization', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Dates</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 2024 – Present"
                        value={item.dates}
                        onChange={(e) => handleUpdate(item.id, 'dates', e.target.value)}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        <span>Description</span>
                        <span className="optional">Optional</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        rows={2}
                        placeholder="Mentored junior peers in web development and hosted weekly code reviews."
                        value={item.description}
                        onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VolunteerSection;
