import React, { useState, useRef } from 'react';
import { X, UploadCloud, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { aiService } from '../services/api';

const UploadResumeModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF resumes are supported. Please select a .pdf file.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please upload a smaller PDF.');
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a PDF resume to upload.');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const res = await aiService.parseResume(formData);

      if (res.data?.success) {
        onUploadSuccess({
          title: res.data.title || file.name.replace(/\.pdf$/i, ''),
          data: res.data.data,
        });
      } else {
        setError(res.data?.message || 'Failed to parse resume.');
      }
    } catch (err) {
      console.error('[Upload Parse Error]:', err);
      const msg = err.response?.data?.message || 'Server error while parsing resume.';
      setError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={20} color="var(--primary)" />
            <h3>Upload PDF Resume</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Upload your existing PDF resume. AI will extract your education, experience, technical skills, and projects so you can review and refine them in the editor.
            </p>

            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border-strong)'}`,
                backgroundColor: dragActive ? 'var(--primary-light)' : '#f8fafc',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                disabled={isUploading}
              />

              {file ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={36} color="var(--primary)" />
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                    {file.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Click or drop to replace
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <UploadCloud size={36} color="var(--text-muted)" />
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                    Click to browse or drag & drop your PDF
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    Maximum file size: 5MB
                  </span>
                </div>
              )}
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--danger)', fontSize: '0.8125rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {isUploading && (
              <div style={{ marginTop: '1.25rem', padding: '0.875rem', backgroundColor: '#eff6ff', borderRadius: 'var(--radius-md)', border: '1px solid #bfdbfe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#1e40af', fontSize: '0.875rem', fontWeight: 500 }}>
                  <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Extracting & structuring resume with Gemini AI...</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '0.375rem', marginLeft: '1.75rem' }}>
                  This may take a few seconds while sections are analyzed.
                </p>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={isUploading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!file || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Analyzing Resume...</span>
                </>
              ) : (
                'Extract & Edit Resume'
              )}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UploadResumeModal;
