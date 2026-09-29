import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, X, Wrench, Tag } from 'lucide-react';

const SkillsSection = ({ skillCategories = [], onChange }) => {
  const [newSkillInput, setNewSkillInput] = useState({});

  const handleAddCategory = () => {
    const newCategory = {
      id: `cat_${Date.now()}`,
      categoryName: '',
      skills: [],
    };
    onChange([...skillCategories, newCategory]);
  };

  const handleUpdateCategoryName = (id, newName) => {
    onChange(
      skillCategories.map((cat) => (cat.id === id ? { ...cat, categoryName: newName } : cat))
    );
  };

  const handleDeleteCategory = (id) => {
    onChange(skillCategories.filter((cat) => cat.id !== id));
  };

  const handleMoveCategory = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= skillCategories.length) return;
    const reordered = [...skillCategories];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  const handleAddSkill = (catId) => {
    const skillValue = (newSkillInput[catId] || '').trim();
    if (!skillValue) return;

    // Support comma-separated input (e.g. "React, Node.js, Redux")
    const newSkills = skillValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onChange(
      skillCategories.map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            skills: [...(cat.skills || []), ...newSkills],
          };
        }
        return cat;
      })
    );

    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const handleDeleteSkill = (catId, skillIndex) => {
    onChange(
      skillCategories.map((cat) => {
        if (cat.id === catId) {
          const updated = [...cat.skills];
          updated.splice(skillIndex, 1);
          return { ...cat, skills: updated };
        }
        return cat;
      })
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Technical Skills
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Organize your technical competencies into clean categories (e.g., Languages, Frontend, Backend, Databases, Tools).
          </p>
        </div>

        <button type="button" onClick={handleAddCategory} className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>Add Skill Category</span>
        </button>
      </div>

      {skillCategories.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-strong)',
        }}>
          <Wrench size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            No skill categories added yet. Group your technical expertise for ATS parsing.
          </p>
          <button type="button" onClick={handleAddCategory} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>Add First Category</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {skillCategories.map((cat, index) => (
            <div
              key={cat.id || index}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                <div style={{ flex: 1, maxWidth: '280px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Category Name (e.g. Languages)"
                    value={cat.categoryName}
                    onChange={(e) => handleUpdateCategoryName(cat.id, e.target.value)}
                    style={{ fontWeight: 600 }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveCategory(index, -1)}
                    className="btn btn-secondary btn-sm"
                    title="Move category up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    type="button"
                    disabled={index === skillCategories.length - 1}
                    onClick={() => handleMoveCategory(index, 1)}
                    className="btn btn-secondary btn-sm"
                    title="Move category down"
                  >
                    <ArrowDown size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="btn btn-danger btn-sm"
                    title="Delete category"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              {/* Skill Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                {(cat.skills || []).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '9999px',
                      fontSize: '0.8125rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(cat.id, sIdx)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                      title="Remove skill"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {(cat.skills || []).length === 0 && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No skills added yet in this category.
                  </span>
                )}
              </div>

              {/* Add Skill Input Inside Category */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Type a skill (or comma separated, e.g. Java, Python) and press Enter"
                  value={newSkillInput[cat.id] || ''}
                  onChange={(e) => setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(cat.id);
                    }
                  }}
                  style={{ fontSize: '0.8125rem' }}
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(cat.id)}
                  className="btn btn-secondary btn-sm"
                >
                  <Tag size={13} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
