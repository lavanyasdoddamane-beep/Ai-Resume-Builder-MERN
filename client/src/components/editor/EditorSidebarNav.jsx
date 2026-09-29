import React from 'react';
import {
  User,
  FileText,
  GraduationCap,
  Wrench,
  Briefcase,
  FolderGit2,
  Award,
  Trophy,
  Building2,
  Languages,
  HeartHandshake,
  Check,
} from 'lucide-react';

export const SECTIONS = [
  { id: 'personal', name: 'Personal Information', icon: User, required: true },
  { id: 'summary', name: 'Professional Summary', icon: FileText, required: false },
  { id: 'education', name: 'Education', icon: GraduationCap, required: false },
  { id: 'skills', name: 'Technical Skills', icon: Wrench, required: false },
  { id: 'experience', name: 'Experience', icon: Briefcase, required: false },
  { id: 'projects', name: 'Projects', icon: FolderGit2, required: false },
  { id: 'certifications', name: 'Certifications', icon: Award, required: false },
  { id: 'achievements', name: 'Achievements & Activities', icon: Trophy, required: false },
  { id: 'internships', name: 'Internships', icon: Building2, required: false },
  { id: 'languages', name: 'Languages', icon: Languages, required: false },
  { id: 'volunteer', name: 'Volunteer Experience', icon: HeartHandshake, required: false },
];

const EditorSidebarNav = ({ currentSection, onSelectSection, resumeData }) => {
  // Helper to check if a section has content entered
  const isSectionFilled = (id) => {
    switch (id) {
      case 'personal':
        return !!(resumeData.personalInfo?.fullName && resumeData.personalInfo?.email);
      case 'summary':
        return !!(resumeData.summary && resumeData.summary.trim());
      case 'education':
        return (resumeData.education || []).length > 0;
      case 'skills':
        return (resumeData.skillCategories || []).some(
          (c) => c.categoryName && (c.skills || []).length > 0
        );
      case 'experience':
        return (resumeData.experience || []).length > 0;
      case 'projects':
        return (resumeData.projects || []).length > 0;
      case 'certifications':
        return (resumeData.certifications || []).length > 0;
      case 'achievements':
        return (resumeData.achievements || []).length > 0;
      case 'internships':
        return (resumeData.internships || []).length > 0;
      case 'languages':
        return (resumeData.languages || []).length > 0;
      case 'volunteer':
        return (resumeData.volunteerExperience || []).length > 0;
      default:
        return false;
    }
  };

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Resume Sections
      </div>

      <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {SECTIONS.map((sec, index) => {
          const Icon = sec.icon;
          const isActive = currentSection === sec.id;
          const isFilled = isSectionFilled(sec.id);

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.8125rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: isActive ? 'var(--primary)' : 'var(--text-light)',
                  width: '16px',
                }}>
                  {index + 1}.
                </span>
                <Icon size={15} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                <span>{sec.name}</span>
              </div>

              {isFilled && (
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  flexShrink: 0,
                }}>
                  <Check size={10} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EditorSidebarNav;
