import React, { useRef } from 'react';
import ClassicTemplate from './ClassicTemplate';
import { downloadResumePDF } from '../../utils/pdfExport';
import { Download, Printer } from 'lucide-react';

const ResumePreview = ({ resumeData }) => {
  const previewRef = useRef(null);

  const handleDownloadPDF = () => {
    downloadResumePDF('classic-resume-printable', resumeData.title);
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <div className="resume-preview-wrapper" ref={previewRef}>
      {/* Floating Preview Header / Quick Export */}
      <div
        style={{
          width: '210mm',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          color: '#ffffff',
          fontSize: '0.8125rem',
        }}
        className="no-print"
      >
        <span style={{ opacity: 0.85 }}>A4 Document Preview (Live)</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleNativePrint}
            className="btn btn-secondary btn-sm"
            style={{ backgroundColor: '#ffffff', color: '#1e293b' }}
            title="Print resume"
          >
            <Printer size={14} />
            <span>Print</span>
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
      </div>

      {/* Render Template */}
      <ClassicTemplate resumeData={resumeData} />
    </div>
  );
};

export default ResumePreview;
