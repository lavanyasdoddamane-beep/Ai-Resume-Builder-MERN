import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Building2, Sparkles } from 'lucide-react';
import { aiService } from '../../services/api';
import AIEnhanceBox from '../AIEnhanceBox';

const InternshipsSection = ({ internships = [], onChange }) => {
  const [expandedId, setExpandedId] = useState(internships.length > 0 ? internships[0].id : null);
  const [aiState, setAiState] = useState({
    activeId: null,
    loading: false,
    suggestion: '',
    error: '',
  });

  const handleAdd = () => {
    const newEntry = {
      id: `intern_${Date.now()}`,
      role: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      technologies: '',
      description: '',
    };
    onChange([...internships, newEntry]);
    setExpandedId(newEntry.id);
  };

  const handleUpdate = (id, field, value) => {
    onChange(
      internships.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id) => {
    onChange(internships.filter((item) => item.id !== id));
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= internships.length) return;
    const reordered = [...internships];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  // AI Enhancement
  const handleEnhance = async (item) => {
    if (!item.description || !item.description.trim()) {
      setAiState({
        activeId: item.id,
        loading: false,
        suggestion: '',
        error: 'Please enter internship notes or draft before requesting AI improvement.',
      });
      return;
    }

    setAiState({
      activeId: item.id,
      loading: true,
      suggestion: '',
      error: '',
    });

    try {
      const res = await aiService.enhance({
        section: 'internship',
        text: item.description,
        context: {
          role: item.role,
          company: item.organization,
          technologies: item.technologies,
        },
      });

      if (res.data?.success) {
        setAiState({
          activeId: item.id,
          loading: false,
          suggestion: res.data.suggestion,
          error: '',
        });
      } else {
        setAiState({
          activeId: item.id,
          loading: false,
          suggestion: '',
          error: res.data?.message || 'Failed to enhance description.',
        });
      }
    } catch (err) {
      setAiState({
        activeId: item.id,
        loading: false,
        suggestion: '',
        error: err.response?.data?.message || 'AI service error.',
      });
    }
  };

  const handleUseSuggestion = (id, text) => {
    handleUpdate(id, 'description', text);
    setAiState({ activeId: null, loading: false, suggestion: '', error: '' });
  };

  const handleCancelSuggestion = () => {
    setAiState({ activeId: null, loading: false, suggestion: '', error: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Internships
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            List your college or industry internships separately from full-time work experience.
          </p>
        </div>

        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>Add Internship</span>
        </button>
      </div>

      {internships.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-strong)',
        }}>
          <Building2 size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No internships added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>Add Internship Entry</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internships.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const itemAiState = aiState.activeId === item.id ? aiState : {};

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
                      {item.role || 'Untitled Internship'}
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
                      disabled={index === internships.length - 1}
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
                      title="Delete internship"
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
                        <label className="form-label">Internship Role</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Frontend Engineering Intern"
                          value={item.role}
                          onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Organization / Company</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Innovate Labs"
                          value={item.organization}
                          onChange={(e) => handleUpdate(item.id, 'organization', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Remote / Bengaluru"
                          value={item.location}
                          onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Jun 2024"
                          value={item.startDate}
                          onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Aug 2024"
                          value={item.endDate}
                          onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Technologies Used</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. React, TypeScript, Redux, REST APIs"
                        value={item.technologies}
                        onChange={(e) => handleUpdate(item.id, 'technologies', e.target.value)}
                      />
                    </div>

                    {/* Description with AI Enhance */}
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                        <label className="form-label" style={{ marginBottom: 0 }}>
                          Internship Deliverables & Experience
                        </label>
                        <button
                          type="button"
                          onClick={() => handleEnhance(item)}
                          disabled={itemAiState.loading || !item.description?.trim()}
                          className="btn btn-ai btn-sm"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          <Sparkles size={12} />
                          <span>{itemAiState.loading ? 'Improving...' : 'Improve with AI'}</span>
                        </button>
                      </div>
                      <textarea
                        className="form-textarea"
                        rows={4}
                        placeholder="• Implemented responsive frontend UI components in React.&#10;• Integrated backend endpoints and assisted in unit test coverage."
                        value={item.description}
                        onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                      />
                    </div>

                    {/* AI Box */}
                    {itemAiState.activeId === item.id && (
                      <AIEnhanceBox
                        isLoading={itemAiState.loading}
                        suggestion={itemAiState.suggestion}
                        onUseSuggestion={(sug) => handleUseSuggestion(item.id, sug)}
                        onRegenerate={() => handleEnhance(item)}
                        onCancel={handleCancelSuggestion}
                        error={itemAiState.error}
                      />
                    )}
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

export default InternshipsSection;
