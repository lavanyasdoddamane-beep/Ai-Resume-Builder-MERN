import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CreateResumeModal from '../components/CreateResumeModal';
import UploadResumeModal from '../components/UploadResumeModal';
import {
  Sparkles,
  UploadCloud,
  Eye,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { resumeService } from '../services/api';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // If user clicks action when logged out, redirect to login
  const handleCreateClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/dashboard' }, action: 'create' } });
    } else {
      setIsCreateModalOpen(true);
    }
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/dashboard' }, action: 'upload' } });
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleCreateResume = async (title) => {
    try {
      const res = await resumeService.create({ title });
      if (res.data?.success) {
        setIsCreateModalOpen(false);
        navigate(`/editor/${res.data.data._id}`);
      }
    } catch (err) {
      console.error('Error creating resume:', err);
    }
  };

  const handleUploadSuccess = ({ title, data }) => {
    setIsUploadModalOpen(false);
    // Navigate to editor with newly extracted draft without saving yet
    navigate('/editor/new', { state: { initialData: data, initialTitle: title } });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            border: '1px solid var(--primary-border)',
          }}>
            <Sparkles size={14} />
            <span>MERN Stack & Google Gemini AI Powered</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Build a Professional Resume with AI
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '700px',
            marginInline: 'auto',
          }}>
            Create ATS-friendly resumes in minutes. Build from scratch or upload your existing PDF resume,
            enhance your bullet points with Gemini AI, preview live in true A4 format, and export ready for recruiters.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <button onClick={handleCreateClick} className="btn btn-primary btn-lg" style={{ minWidth: '180px' }}>
              <span>Create Resume</span>
              <ArrowRight size={18} />
            </button>

            <button onClick={handleUploadClick} className="btn btn-secondary btn-lg" style={{ minWidth: '180px' }}>
              <UploadCloud size={18} color="var(--primary)" />
              <span>Upload Resume</span>
            </button>
          </div>

          <div style={{
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle size={15} color="#16a34a" />
              <span>100% ATS Compliant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle size={15} color="#16a34a" />
              <span>Instant Live Preview</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle size={15} color="#16a34a" />
              <span>Free True A4 PDF Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Engineered for Academic Viva & Career Success
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Built with modern architecture, complete data separation, and transparent AI controls.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Card 1 */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <Sparkles size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              AI-Powered Writing
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Strengthen your summaries, project descriptions, and experience with Gemini AI. View suggestions side-by-side with full user control.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f0fdf4',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <UploadCloud size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Resume Upload & Parsing
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Upload your existing PDF resume. The backend extracts text and AI formats it into editable sections ready for your review.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f5f3ff',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <Eye size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Live Resume Preview
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Real-time two-pane editor. Every keystroke, skill addition, or color change immediately updates your live A4 document.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#fffbeb',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <FileCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Professional A4 Formatting
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Accurate 210mm x 297mm dimensions, balanced spacing, clean margins, and single-column ATS typography designed for recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Ready to Build Your Winning Resume?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.9375rem' }}>
            Sign up for free, manage multiple tailored resumes, and download recruiters' preferred PDF format.
          </p>
          <button onClick={handleCreateClick} className="btn btn-primary btn-lg">
            <span>Get Started Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer />

      {/* Modals for Create and Upload */}
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
    </div>
  );
};

export default LandingPage;
