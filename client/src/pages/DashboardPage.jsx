import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CreateResumeModal from '../components/CreateResumeModal';
import UploadResumeModal from '../components/UploadResumeModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { resumeService } from '../services/api';
import {
  PlusCircle,
  UploadCloud,
  FileText,
  Clock,
  Edit3,
  Trash2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch resumes for authenticated user
  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await resumeService.getAll();
      if (res.data?.success) {
        setResumes(res.data.data || []);
      }
    } catch (err) {
      console.error('[Fetch Resumes Error]:', err);
      setError('Could not load resumes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Handle Create Resume from Scratch
  const handleCreateResume = async (title) => {
    try {
      const res = await resumeService.create({
        title,
        personalInfo: {
          fullName: user?.name || '',
          email: user?.email || '',
          phone: '',
          profession: '',
          linkedin: '',
          website: '',
          profileImage: '',
        },
      });

      if (res.data?.success) {
        setIsCreateModalOpen(false);
        navigate(`/editor/${res.data.data._id}`);
      }
    } catch (err) {
      console.error('[Create Resume Error]:', err);
      alert('Failed to create resume: ' + (err.response?.data?.message || err.message));
    }
  };

  // Handle Uploaded PDF resume
  const handleUploadSuccess = ({ title, data }) => {
    setIsUploadModalOpen(false);
    // User must be able to review the extracted information first without auto-saving
    navigate('/editor/new', { state: { initialData: data, initialTitle: title } });
  };

  // Handle Delete Confirmation
  const handleDeleteResume = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await resumeService.delete(deleteTarget._id);
      if (res.data?.success) {
        setResumes((prev) => prev.filter((r) => r._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error('[Delete Resume Error]:', err);
      alert('Failed to delete resume: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Welcome Banner */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Welcome back, {user?.name || 'Candidate'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Create, manage, and optimize your ATS-tailored resumes in one place.
          </p>
        </div>

        {/* Primary Action Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {/* Card 1: Create Resume */}
          <div
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <PlusCircle size={24} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Create Resume
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Build a resume from scratch.
              </p>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <span className="btn btn-primary btn-sm">
                Start From Scratch
              </span>
            </div>
          </div>

          {/* Card 2: Upload Resume */}
          <div
            onClick={() => setIsUploadModalOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#16a34a';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
          >
            <div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f0fdf4',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <UploadCloud size={24} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Upload Resume
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Upload an existing PDF resume and let AI extract the information.
              </p>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <span className="btn btn-secondary btn-sm" style={{ color: '#16a34a', borderColor: '#bbf7d0' }}>
                Upload Existing PDF
              </span>
            </div>
          </div>
        </div>

        {/* Saved Resumes Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              Your Resumes
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Manage, update, and download your customized resumes.
            </p>
          </div>
          {resumes.length > 0 && (
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', backgroundColor: '#ffffff', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              {resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'}
            </span>
          )}
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem', backgroundColor: 'var(--danger-light)', border: '1px solid var(--danger-border)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <Loader2 size={32} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--border-strong)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FileText size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Create your first resume
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                You haven't created any resumes yet. Start fresh or upload an existing PDF to begin.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary btn-sm">
                <PlusCircle size={15} />
                <span>Create Resume</span>
              </button>
              <button onClick={() => setIsUploadModalOpen(true)} className="btn btn-secondary btn-sm">
                <UploadCloud size={15} />
                <span>Upload PDF</span>
              </button>
            </div>
          </div>
        ) : (
          /* Resume List */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}>
            {resumes.map((resume) => (
              <div
                key={resume._id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.25rem 1.5rem',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  borderTop: `4px solid ${resume.selectedColor || '#1e3a8a'}`,
                  transition: 'box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={18} color={resume.selectedColor || 'var(--primary)'} />
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {resume.title || 'Untitled Resume'}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    <Clock size={13} />
                    <span>Last updated: {formatDate(resume.updatedAt)}</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.625rem',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.875rem',
                }}>
                  <button
                    onClick={() => navigate(`/editor/${resume._id}`)}
                    className="btn btn-secondary btn-sm"
                    title="Edit resume"
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteTarget(resume)}
                    className="btn btn-danger btn-sm"
                    title="Delete resume"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <CreateResumeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateResume}
      />

      <UploadResumeModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteResume}
        resumeTitle={deleteTarget?.title}
        isDeleting={isDeleting}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
