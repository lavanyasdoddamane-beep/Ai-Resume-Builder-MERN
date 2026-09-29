import React, { useState } from 'react';
import { X, FilePlus } from 'lucide-react';

const CreateResumeModal = ({ isOpen, onClose, onCreate }) => {
  const [resumeName, setResumeName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeName.trim()) {
      setError('Please provide a resume name.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await onCreate(resumeName.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FilePlus size={20} color="var(--primary)" />
            <h3>Name Your Resume</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Give your resume a descriptive name to organize your applications (e.g., target role or company).
            </p>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="resumeName">
                Resume Name <span className="required">*</span>
              </label>
              <input
                id="resumeName"
                type="text"
                className="form-input"
                placeholder="e.g., Java Full Stack Developer Resume"
                value={resumeName}
                onChange={(e) => {
                  setResumeName(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
              />
              {error && <p className="form-error">{error}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Continue to Editor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResumeModal;
