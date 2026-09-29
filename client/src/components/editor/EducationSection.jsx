import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const EducationSection = ({ education = [], onChange }) => {
  const [expandedId, setExpandedId] = useState(education.length > 0 ? education[0].id : null);

  const handleAdd = () => {
    const newEntry = {
      id: `edu_${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      location: '',
      description: '',
    };
    onChange([...education, newEntry]);
    setExpandedId(newEntry.id);
  };

  const handleUpdate = (id, field, value) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id) => {
    onChange(education.filter((item) => item.id !== id));
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const reordered = [...education];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Education
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Add your degrees, colleges, relevant coursework, and graduation years.
          </p>
        </div>

        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-strong)',
        }}>
          <GraduationCap size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No education entries added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>Add Degree or College</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {education.map((item, index) => {
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
                      {item.institution || 'Untitled College / University'}
                    </span>
                    {item.degree && (
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        • {item.degree}
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
                      disabled={index === education.length - 1}
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

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div style={{ padding: '1.25rem' }}>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Institution / University</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. University BDT College of Engineering"
                          value={item.institution}
                          onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Davangere, Karnataka"
                          value={item.location}
                          onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Degree</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. B.E. / B.Tech / B.S."
                          value={item.degree}
                          onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Field of Study</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Computer Science and Engineering"
                          value={item.fieldOfStudy}
                          onChange={(e) => handleUpdate(item.id, 'fieldOfStudy', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Start Year</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 2023"
                          value={item.startYear}
                          onChange={(e) => handleUpdate(item.id, 'startYear', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Year (or Expected)</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 2027"
                          value={item.endYear}
                          onChange={(e) => handleUpdate(item.id, 'endYear', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">
                        <span>Description / GPA / Coursework</span>
                        <span className="optional">Optional</span>
                      </label>
                      <textarea
                        className="form-textarea"
                        rows={2}
                        placeholder="e.g. CGPA: 9.1/10.0 • Relevant Coursework: Data Structures, Algorithms, Database Systems"
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

export default EducationSection;
