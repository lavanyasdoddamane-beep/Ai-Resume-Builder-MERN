import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Languages as LanguagesIcon } from 'lucide-react';

const PROFICIENCY_OPTIONS = [
  'Native / Bilingual',
  'Professional Working',
  'Full Professional',
  'Conversational',
  'Elementary',
];

const LanguagesSection = ({ languages = [], onChange }) => {
  const handleAdd = () => {
    const newEntry = {
      id: `lang_${Date.now()}`,
      language: '',
      proficiency: 'Professional Working',
    };
    onChange([...languages, newEntry]);
  };

  const handleUpdate = (id, field, value) => {
    onChange(
      languages.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id) => {
    onChange(languages.filter((item) => item.id !== id));
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= languages.length) return;
    const reordered = [...languages];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Languages
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            List languages you speak and your proficiency levels.
          </p>
        </div>

        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>Add Language</span>
        </button>
      </div>

      {languages.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-strong)',
        }}>
          <LanguagesIcon size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No languages added yet.
          </p>
          <button type="button" onClick={handleAdd} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>Add Language Entry</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {languages.map((item, index) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.875rem 1rem',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Language (e.g. English, Kannada, Hindi)"
                  value={item.language}
                  onChange={(e) => handleUpdate(item.id, 'language', e.target.value)}
                />
              </div>

              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Proficiency (e.g. Professional, Native)"
                  value={item.proficiency}
                  onChange={(e) => handleUpdate(item.id, 'proficiency', e.target.value)}
                  list="proficiency-suggestions"
                />
                <datalist id="proficiency-suggestions">
                  {PROFICIENCY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
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
                  disabled={index === languages.length - 1}
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
                  title="Delete language"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagesSection;
