import React from 'react';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid var(--border-subtle)',
      padding: '2.5rem 1.5rem',
      marginTop: 'auto',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
          <FileText size={18} color="var(--primary)" />
          <span>AI Resume Builder</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Professional ATS-friendly resume generation platform built with the MERN stack and powered by Google Gemini AI.
        </p>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', width: '100%' }}>
          &copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
