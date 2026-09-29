import React from 'react';
import { User, Mail, Phone, Briefcase, Linkedin, Globe, Image as ImageIcon, Trash2 } from 'lucide-react';

const PersonalInfoSection = ({ data = {}, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, or JPEG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Profile photo size should be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange('profileImage', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    handleChange('profileImage', '');
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Personal Information
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Enter your contact and professional details. This appears at the top header of your resume.
        </p>
      </div>

      {/* Profile Image Upload (Optional) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '6px',
          backgroundColor: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid var(--border-strong)',
          flexShrink: 0,
        }}>
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Profile preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <ImageIcon size={24} color="var(--text-muted)" />
          )}
        </div>

        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Profile Photo <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>(Optional)</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            A small, professional photo rendered softly at the top right of the header.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </label>
            {data.profileImage && (
              <button
                type="button"
                onClick={removeImage}
                className="btn btn-danger btn-sm"
              >
                <Trash2 size={12} />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Required Name and Email */}
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            <span>Full Name <span className="required">*</span></span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="fullName"
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="e.g. Alex Morgan"
              value={data.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
            />
            <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            <span>Email Address <span className="required">*</span></span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="email"
              type="email"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="e.g. alex.morgan@example.com"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
            <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Optional Profession and Phone */}
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="profession">
            <span>Profession / Job Title</span>
            <span className="optional">Optional</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="profession"
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="e.g. Full Stack Developer"
              value={data.profession || ''}
              onChange={(e) => handleChange('profession', e.target.value)}
            />
            <Briefcase size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            <span>Phone Number</span>
            <span className="optional">Optional</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="phone"
              type="tel"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="e.g. +1 (555) 234-5678"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Optional LinkedIn and Website */}
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="linkedin">
            <span>LinkedIn Profile</span>
            <span className="optional">Optional</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="linkedin"
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="e.g. linkedin.com/in/alexmorgan"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
            <Linkedin size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="website">
            <span>Personal Website</span>
            <span className="optional">Optional</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="website"
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              placeholder="e.g. alexmorgan.dev"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
            <Globe size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
