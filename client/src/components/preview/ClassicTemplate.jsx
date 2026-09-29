import React from 'react';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

/**
 * Classic Resume Template
 * Single column, traditional ATS-friendly, clean, minimal A4 document.
 * Adheres strictly to typography, hierarchy, spacing, and specified section order.
 */
const ClassicTemplate = ({ resumeData }) => {
  const {
    personalInfo = {},
    summary = '',
    skillCategories = [],
    projects = [],
    education = [],
    experience = [],
    internships = [],
    certifications = [],
    achievements = [],
    languages = [],
    volunteerExperience = [],
    selectedColor = '#1e3a8a',
  } = resumeData;

  const accentColor = selectedColor || '#1e3a8a';

  return (
    <div
      className="resume-a4-document"
      id="classic-resume-printable"
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#111827',
        lineHeight: 1.48,
        fontSize: '9.25px',
      }}
    >
      {/* ====================================================================
          RESUME HEADER
          ==================================================================== */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: `1.5px solid ${accentColor}`,
          paddingBottom: '12px',
          marginBottom: '16px',
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Full Name: 22-24px bold */}
          <h1
            style={{
              fontSize: '23px',
              fontWeight: 700,
              color: accentColor,
              letterSpacing: '-0.02em',
              margin: '0 0 2px 0',
              lineHeight: 1.15,
            }}
          >
            {personalInfo.fullName || 'Your Full Name'}
          </h1>

          {/* Professional Title: 10-11px */}
          {personalInfo.profession && (
            <div
              style={{
                fontSize: '10.5px',
                fontWeight: 600,
                color: '#4b5563',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              {personalInfo.profession}
            </div>
          )}

          {/* Contact Information: 8.5-9px */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              fontSize: '8.75px',
              color: '#374151',
              marginTop: '4px',
            }}
          >
            {personalInfo.email && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Mail size={10} color={accentColor} />
                <a
                  href={`mailto:${personalInfo.email}`}
                  style={{ color: '#1e3a8a', textDecoration: 'none' }}
                >
                  {personalInfo.email}
                </a>
              </span>
            )}

            {personalInfo.phone && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Phone size={10} color={accentColor} />
                <span>{personalInfo.phone}</span>
              </span>
            )}

            {personalInfo.linkedin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Linkedin size={10} color={accentColor} />
                <a
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'none' }}
                >
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, 'linkedin.com/in/')}
                </a>
              </span>
            )}

            {personalInfo.website && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Globe size={10} color={accentColor} />
                <a
                  href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'none' }}
                >
                  {personalInfo.website.replace(/^https?:\/\//i, '')}
                </a>
              </span>
            )}
          </div>
        </div>

        {/* Optional Profile Image: small, top-right, softly rounded */}
        {personalInfo.profileImage && (
          <div
            style={{
              marginLeft: '16px',
              flexShrink: 0,
            }}
          >
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.fullName || 'Candidate'}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
              }}
            />
          </div>
        )}
      </header>

      {/* ====================================================================
          SECTION 1: PROFESSIONAL SUMMARY
          ==================================================================== */}
      {summary && summary.trim() && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p
            style={{
              fontSize: '9.25px',
              lineHeight: 1.5,
              color: '#1f2937',
              textAlign: 'justify',
              margin: 0,
            }}
          >
            {summary}
          </p>
        </section>
      )}

      {/* ====================================================================
          SECTION 2: TECHNICAL SKILLS (Clean Two-Column Category / Skills Layout)
          ==================================================================== */}
      {skillCategories && skillCategories.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            TECHNICAL SKILLS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5px' }}>
            {skillCategories.map((cat, idx) => {
              const skillList = Array.isArray(cat.skills)
                ? cat.skills.filter(Boolean).join(' • ')
                : '';
              if (!cat.categoryName && !skillList) return null;
              return (
                <div
                  key={cat.id || idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '130px 1fr',
                    fontSize: '9.25px',
                    lineHeight: 1.45,
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>
                    {cat.categoryName}:
                  </span>
                  <span style={{ color: '#374151' }}>
                    {skillList}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 3: PROJECTS (Appears before Education in final resume)
          ==================================================================== */}
      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            PROJECTS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#111827' }}>
                    {proj.projectName}
                    {proj.role && (
                      <span style={{ fontWeight: 500, color: '#4b5563', marginLeft: '6px' }}>
                        | {proj.role}
                      </span>
                    )}
                  </span>
                  {(proj.startDate || proj.endDate) && (
                    <span style={{ fontSize: '8.75px', color: '#6b7280', fontStyle: 'italic' }}>
                      {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                    </span>
                  )}
                </div>

                {proj.technologies && (
                  <div style={{ fontSize: '8.75px', color: '#4b5563', marginTop: '1px' }}>
                    <span style={{ fontWeight: 600 }}>Technologies:</span> {proj.technologies}
                  </div>
                )}

                {proj.description && (
                  <div
                    style={{
                      fontSize: '9.25px',
                      color: '#374151',
                      marginTop: '3px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {proj.description}
                  </div>
                )}

                {proj.projectUrl && (
                  <div style={{ fontSize: '8.5px', marginTop: '2px' }}>
                    <a
                      href={proj.projectUrl.startsWith('http') ? proj.projectUrl : `https://${proj.projectUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#2563eb', textDecoration: 'none' }}
                    >
                      {proj.projectUrl}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 4: EDUCATION
          ==================================================================== */}
      {education && education.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            EDUCATION
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {education.map((edu, idx) => (
              <div key={edu.id || idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#111827' }}>
                    {edu.institution}
                  </span>
                  {(edu.startYear || edu.endYear) && (
                    <span style={{ fontSize: '8.75px', color: '#6b7280', fontStyle: 'italic' }}>
                      {edu.startYear} {edu.startYear && edu.endYear ? '–' : ''} {edu.endYear}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    color: '#374151',
                    fontSize: '9.25px',
                  }}
                >
                  <span>
                    {edu.degree} {edu.degree && edu.fieldOfStudy ? 'in' : ''} {edu.fieldOfStudy}
                  </span>
                  {edu.location && (
                    <span style={{ fontSize: '8.5px', color: '#6b7280' }}>
                      {edu.location}
                    </span>
                  )}
                </div>

                {edu.description && (
                  <div style={{ fontSize: '9px', color: '#4b5563', marginTop: '2px' }}>
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 5: EXPERIENCE
          ==================================================================== */}
      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            EXPERIENCE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#111827' }}>
                    {exp.jobTitle}
                    {exp.company && (
                      <span style={{ fontWeight: 600, color: '#374151', marginLeft: '6px' }}>
                        — {exp.company}
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: '8.75px', color: '#6b7280', fontStyle: 'italic' }}>
                    {exp.startDate} {exp.startDate ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>

                {exp.location && (
                  <div style={{ fontSize: '8.5px', color: '#6b7280', marginTop: '1px' }}>
                    {exp.location}
                  </div>
                )}

                {exp.description && (
                  <div
                    style={{
                      fontSize: '9.25px',
                      color: '#374151',
                      marginTop: '3px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 6: INTERNSHIPS (Separate from Experience!)
          ==================================================================== */}
      {internships && internships.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            INTERNSHIPS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {internships.map((intern, idx) => (
              <div key={intern.id || idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#111827' }}>
                    {intern.role}
                    {intern.organization && (
                      <span style={{ fontWeight: 600, color: '#374151', marginLeft: '6px' }}>
                        — {intern.organization}
                      </span>
                    )}
                  </span>
                  {(intern.startDate || intern.endDate) && (
                    <span style={{ fontSize: '8.75px', color: '#6b7280', fontStyle: 'italic' }}>
                      {intern.startDate} {intern.startDate && intern.endDate ? '–' : ''} {intern.endDate}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '8.5px',
                    color: '#6b7280',
                    marginTop: '1px',
                  }}
                >
                  {intern.location && <span>{intern.location}</span>}
                  {intern.technologies && <span>Tech: {intern.technologies}</span>}
                </div>

                {intern.description && (
                  <div
                    style={{
                      fontSize: '9.25px',
                      color: '#374151',
                      marginTop: '3px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {intern.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 7: CERTIFICATIONS
          ==================================================================== */}
      {certifications && certifications.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            CERTIFICATIONS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {certifications.map((cert, idx) => (
              <div key={cert.id || idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '9.75px', fontWeight: 700, color: '#111827' }}>
                    {cert.name}
                    {cert.organization && (
                      <span style={{ fontWeight: 500, color: '#4b5563', marginLeft: '4px' }}>
                        — {cert.organization}
                      </span>
                    )}
                  </span>
                  {cert.issueDate && (
                    <span style={{ fontSize: '8.75px', color: '#6b7280', fontStyle: 'italic' }}>
                      {cert.issueDate}
                    </span>
                  )}
                </div>

                {(cert.credentialId || cert.credentialUrl) && (
                  <div style={{ fontSize: '8.5px', color: '#6b7280', marginTop: '1px' }}>
                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                    {cert.credentialId && cert.credentialUrl && <span> • </span>}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl.startsWith('http') ? cert.credentialUrl : `https://${cert.credentialUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#2563eb', textDecoration: 'none' }}
                      >
                        Verify Credential
                      </a>
                    )}
                  </div>
                )}

                {cert.description && (
                  <div style={{ fontSize: '9px', color: '#4b5563', marginTop: '2px' }}>
                    {cert.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 8: ACHIEVEMENTS & ACTIVITIES
          ==================================================================== */}
      {achievements && achievements.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            ACHIEVEMENTS & ACTIVITIES
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {achievements.map((ach, idx) => (
              <div key={ach.id || idx}>
                <div style={{ fontSize: '9.5px', fontWeight: 600, color: '#111827' }}>
                  • {ach.title}
                </div>
                {ach.description && (
                  <div style={{ fontSize: '9px', color: '#374151', marginLeft: '12px', marginTop: '1px' }}>
                    {ach.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 9: LANGUAGES
          ==================================================================== */}
      {languages && languages.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            LANGUAGES
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '9.25px',
              color: '#1f2937',
            }}
          >
            {languages.map((lang, idx) => (
              <span key={lang.id || idx}>
                <strong style={{ fontWeight: 600 }}>{lang.language}</strong>
                {lang.proficiency ? ` — ${lang.proficiency}` : ''}
                {idx < languages.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SECTION 10: VOLUNTEER EXPERIENCE
          ==================================================================== */}
      {volunteerExperience && volunteerExperience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: accentColor,
              letterSpacing: '0.05em',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {volunteerExperience.map((vol, idx) => (
              <div key={vol.id || idx}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '9.75px', fontWeight: 700, color: '#111827' }}>
                    {vol.role}
                    {vol.organization && (
                      <span style={{ fontWeight: 500, color: '#4b5563', marginLeft: '6px' }}>
                        — {vol.organization}
                      </span>
                    )}
                  </span>
                  {vol.dates && (
                    <span style={{ fontSize: '8.75px', color: '#6b7280', fontStyle: 'italic' }}>
                      {vol.dates}
                    </span>
                  )}
                </div>
                {vol.description && (
                  <div style={{ fontSize: '9px', color: '#374151', marginTop: '2px' }}>
                    {vol.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
