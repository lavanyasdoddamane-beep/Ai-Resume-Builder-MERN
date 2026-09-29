import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeService } from '../services/api';
import EditorSidebarNav, { SECTIONS } from '../components/editor/EditorSidebarNav';
import PersonalInfoSection from '../components/editor/PersonalInfoSection';
import SummarySection from '../components/editor/SummarySection';
import EducationSection from '../components/editor/EducationSection';
import SkillsSection from '../components/editor/SkillsSection';
import ExperienceSection from '../components/editor/ExperienceSection';
import ProjectsSection from '../components/editor/ProjectsSection';
import CertificationsSection from '../components/editor/CertificationsSection';
import AchievementsSection from '../components/editor/AchievementsSection';
import InternshipsSection from '../components/editor/InternshipsSection';
import LanguagesSection from '../components/editor/LanguagesSection';
import VolunteerSection from '../components/editor/VolunteerSection';
import ResumePreview from '../components/preview/ResumePreview';
import {
  ArrowLeft,
  Save,
  Check,
  Download,
  Eye,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Palette,
} from 'lucide-react';
import { downloadResumePDF } from '../utils/pdfExport';

// Professional Accent Colors
const COLOR_OPTIONS = [
  { name: 'Dark Blue', hex: '#1e3a8a' },
  { name: 'Navy', hex: '#0f172a' },
  { name: 'Charcoal', hex: '#334155' },
  { name: 'Forest Green', hex: '#14532d' },
  { name: 'Burgundy', hex: '#831843' },
];

const INITIAL_RESUME_STATE = {
  title: 'Untitled Resume',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    linkedin: '',
    website: '',
    profileImage: '',
  },
  summary: '',
  skillCategories: [],
  projects: [],
  education: [],
  experience: [],
  internships: [],
  certifications: [],
  achievements: [],
  languages: [],
  volunteerExperience: [],
  selectedColor: '#1e3a8a',
  templateName: 'classic',
};

const ResumeEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [resumeData, setResumeData] = useState(INITIAL_RESUME_STATE);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ message: '', type: '' });
  const [resumeId, setResumeId] = useState(id === 'new' ? null : id);
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'

  // Load existing resume or use location state from upload
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);

      // Case 1: Freshly uploaded resume waiting for user review before first save
      if (id === 'new' && location.state?.initialData) {
        setResumeData({
          ...INITIAL_RESUME_STATE,
          ...location.state.initialData,
          title: location.state.initialTitle || 'Extracted Resume',
          selectedColor: '#1e3a8a',
        });
        setLoading(false);
        return;
      }

      // Case 2: New scratch resume
      if (id === 'new') {
        setResumeData({
          ...INITIAL_RESUME_STATE,
          personalInfo: {
            ...INITIAL_RESUME_STATE.personalInfo,
            fullName: user?.name || '',
            email: user?.email || '',
          },
        });
        setLoading(false);
        return;
      }

      // Case 3: Load existing saved resume from backend
      try {
        const res = await resumeService.getById(id);
        if (res.data?.success) {
          setResumeData(res.data.data);
          setResumeId(res.data.data._id);
        }
      } catch (err) {
        console.error('[Load Resume Error]:', err);
        setSaveStatus({
          message: 'Failed to load resume. It may have been deleted or you do not have permission.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, location.state, user]);

  // Save handler
  const handleSave = async (showNotification = true) => {
    // Validate required fields
    if (!resumeData.personalInfo?.fullName?.trim() || !resumeData.personalInfo?.email?.trim()) {
      if (currentSectionIndex !== 0) {
        setCurrentSectionIndex(0);
      }
      setSaveStatus({
        message: 'Full Name and Email Address are required in Personal Information.',
        type: 'error',
      });
      return false;
    }

    setSaving(true);
    try {
      if (resumeId) {
        // Update existing resume
        const res = await resumeService.update(resumeId, resumeData);
        if (res.data?.success) {
          setResumeData(res.data.data);
          if (showNotification) {
            setSaveStatus({ message: 'Resume saved successfully.', type: 'success' });
            setTimeout(() => setSaveStatus({ message: '', type: '' }), 3000);
          }
          return true;
        }
      } else {
        // Create new resume in database (e.g. reviewed upload or new draft)
        const res = await resumeService.create(resumeData);
        if (res.data?.success) {
          const newDoc = res.data.data;
          setResumeId(newDoc._id);
          setResumeData(newDoc);
          // Update URL without full page reload
          navigate(`/editor/${newDoc._id}`, { replace: true });
          if (showNotification) {
            setSaveStatus({ message: 'Resume saved successfully.', type: 'success' });
            setTimeout(() => setSaveStatus({ message: '', type: '' }), 3000);
          }
          return true;
        }
      }
    } catch (err) {
      console.error('[Save Resume Error]:', err);
      setSaveStatus({
        message: err.response?.data?.message || 'Error saving resume.',
        type: 'error',
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Section navigation handlers
  const handleNext = async () => {
    // Auto-save progress when moving forward
    await handleSave(false);
    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handleDownloadPDF = () => {
    downloadResumePDF('classic-resume-printable', resumeData.title);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-primary)' }}>
        <Loader2 size={36} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading resume editor...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const currentSection = SECTIONS[currentSectionIndex];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Editor Top Navigation Bar */}
      <header
        style={{
          height: 'var(--header-height)',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
        className="no-print"
      >
        {/* Left: Back & Resume Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/dashboard"
            className="btn btn-secondary btn-sm"
            title="Return to Dashboard"
          >
            <ArrowLeft size={15} />
            <span>Dashboard</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              value={resumeData.title}
              onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
              style={{
                fontFamily: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                border: '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                width: 'clamp(180px, 20vw, 320px)',
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.borderColor = 'var(--border-strong)';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
              }}
              title="Click to rename resume"
            />
          </div>
        </div>

        {/* Center: Color Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={15} color="var(--text-muted)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Accent:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {COLOR_OPTIONS.map((col) => {
              const isSelected = (resumeData.selectedColor || '#1e3a8a') === col.hex;
              return (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => setResumeData({ ...resumeData, selectedColor: col.hex })}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: col.hex,
                    border: isSelected ? '2px solid #2563eb' : '1px solid rgba(0,0,0,0.15)',
                    boxShadow: isSelected ? '0 0 0 2px #bfdbfe' : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.1s ease',
                  }}
                  title={col.name}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Save & Export Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {/* Mobile view toggle */}
          <div style={{ display: 'none' }} className="mobile-toggle-btn">
            <button
              onClick={() => setMobileTab(mobileTab === 'editor' ? 'preview' : 'editor')}
              className="btn btn-secondary btn-sm"
            >
              {mobileTab === 'editor' ? <Eye size={14} /> : <Edit2 size={14} />}
              <span>{mobileTab === 'editor' ? 'Show Preview' : 'Show Editor'}</span>
            </button>
          </div>

          <button
            onClick={() => handleSave(true)}
            className="btn btn-secondary btn-sm"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary btn-sm"
            title="Download high-resolution A4 PDF"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Save Notification / Error Banner */}
      {saveStatus.message && (
        <div
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: saveStatus.type === 'error' ? 'var(--danger-light)' : 'var(--success-light)',
            color: saveStatus.type === 'error' ? 'var(--danger)' : 'var(--success)',
            borderBottom: `1px solid ${saveStatus.type === 'error' ? 'var(--danger-border)' : '#bbf7d0'}`,
            fontSize: '0.8125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="no-print"
        >
          {saveStatus.type === 'error' ? <AlertCircle size={15} /> : <Check size={15} />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Main Two-Pane Container */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(480px, 52%) 1fr',
          height: 'calc(100vh - var(--header-height))',
          overflow: 'hidden',
        }}
        className="editor-split-container"
      >
        {/* ==================================================================
            LEFT PANE: Section-by-Section Editor with Stepper
            ================================================================== */}
        <div
          style={{
            display: 'flex',
            height: '100%',
            backgroundColor: '#ffffff',
            borderRight: '1px solid var(--border-subtle)',
            overflow: 'hidden',
          }}
          className="no-print editor-left-pane"
        >
          {/* Stepper Navigation */}
          <EditorSidebarNav
            currentSection={currentSection.id}
            onSelectSection={(id) => {
              const idx = SECTIONS.findIndex((s) => s.id === id);
              if (idx !== -1) setCurrentSectionIndex(idx);
            }}
            resumeData={resumeData}
          />

          {/* Active Section Form Area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {/* Form Content */}
            <div style={{ flex: 1, padding: '1.75rem', maxWidth: '720px' }}>
              {currentSection.id === 'personal' && (
                <PersonalInfoSection
                  data={resumeData.personalInfo}
                  onChange={(val) => setResumeData({ ...resumeData, personalInfo: val })}
                />
              )}

              {currentSection.id === 'summary' && (
                <SummarySection
                  summary={resumeData.summary}
                  onChange={(val) => setResumeData({ ...resumeData, summary: val })}
                  context={{ profession: resumeData.personalInfo?.profession }}
                />
              )}

              {currentSection.id === 'education' && (
                <EducationSection
                  education={resumeData.education}
                  onChange={(val) => setResumeData({ ...resumeData, education: val })}
                />
              )}

              {currentSection.id === 'skills' && (
                <SkillsSection
                  skillCategories={resumeData.skillCategories}
                  onChange={(val) => setResumeData({ ...resumeData, skillCategories: val })}
                />
              )}

              {currentSection.id === 'experience' && (
                <ExperienceSection
                  experience={resumeData.experience}
                  onChange={(val) => setResumeData({ ...resumeData, experience: val })}
                />
              )}

              {currentSection.id === 'projects' && (
                <ProjectsSection
                  projects={resumeData.projects}
                  onChange={(val) => setResumeData({ ...resumeData, projects: val })}
                />
              )}

              {currentSection.id === 'certifications' && (
                <CertificationsSection
                  certifications={resumeData.certifications}
                  onChange={(val) => setResumeData({ ...resumeData, certifications: val })}
                />
              )}

              {currentSection.id === 'achievements' && (
                <AchievementsSection
                  achievements={resumeData.achievements}
                  onChange={(val) => setResumeData({ ...resumeData, achievements: val })}
                />
              )}

              {currentSection.id === 'internships' && (
                <InternshipsSection
                  internships={resumeData.internships}
                  onChange={(val) => setResumeData({ ...resumeData, internships: val })}
                />
              )}

              {currentSection.id === 'languages' && (
                <LanguagesSection
                  languages={resumeData.languages}
                  onChange={(val) => setResumeData({ ...resumeData, languages: val })}
                />
              )}

              {currentSection.id === 'volunteer' && (
                <VolunteerSection
                  volunteerExperience={resumeData.volunteerExperience}
                  onChange={(val) => setResumeData({ ...resumeData, volunteerExperience: val })}
                />
              )}
            </div>

            {/* Bottom Section Navigation Controls */}
            <div
              style={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: '#ffffff',
                borderTop: '1px solid var(--border-subtle)',
                padding: '1rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 -2px 5px rgba(0,0,0,0.02)',
              }}
            >
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentSectionIndex === 0}
                className="btn btn-secondary btn-sm"
              >
                <ChevronLeft size={15} />
                <span>Previous</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                {!currentSection.required && currentSectionIndex < SECTIONS.length - 1 && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Skip</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary btn-sm"
                >
                  <span>
                    {currentSectionIndex === SECTIONS.length - 1 ? 'Save & Finish' : 'Save & Continue'}
                  </span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            RIGHT PANE: Live A4 Resume Preview
            ================================================================== */}
        <div style={{ height: '100%', overflow: 'hidden' }} className="editor-right-pane">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .editor-split-container {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeEditorPage;
