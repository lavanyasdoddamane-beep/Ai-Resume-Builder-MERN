/**
 * Utility to download the resume as an exact A4 PDF
 * Dynamically loads html2pdf from CDN when needed, avoiding Rollup/Vite bundling issues,
 * and falls back gracefully to high-quality browser native print.
 */
export const downloadResumePDF = async (elementId, title = 'Resume') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const fileName = title ? `${title.replace(/\s+/g, '_')}.pdf` : 'Resume.pdf';

  try {
    if (!window.html2pdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
        script.integrity = 'sha512-MpDFIChbcY50ma/UvemCM0wyhQDee578wbKMx8bi7373gf5U3tx61trWH4v4082of1GTVWhUGLRcPNIxNkgv9g==';
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load html2pdf script'));
        document.head.appendChild(script);
      });
    }

    if (window.html2pdf) {
      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      window.html2pdf().set(opt).from(element).save();
      return;
    }
  } catch (err) {
    console.warn('[PDF Export] Using native print dialog as fallback:', err);
  }

  // Graceful fallback to native browser print dialog
  window.print();
};
