const pdfParse = require('pdf-parse');
const { enhanceResumeSection, parseResumeWithAI } = require('../services/geminiService');

/**
 * @desc    Enhance a resume section with AI (Summary, Experience, Project, Internship)
 * @route   POST /api/ai/enhance
 * @access  Private
 */
const enhanceContent = async (req, res) => {
  try {
    const { section, text, context } = req.body;

    if (!section || !text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both section name and text to enhance.',
      });
    }

    const suggestion = await enhanceResumeSection({ section, text, context });

    return res.status(200).json({
      success: true,
      suggestion,
    });
  } catch (error) {
    console.error('[AI Enhance Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to enhance content with AI.',
    });
  }
};

/**
 * @desc    Parse uploaded PDF resume and extract structured JSON
 * @route   POST /api/ai/parse-resume
 * @access  Private
 */
const parseUploadedResume = async (req, res) => {
  try {
    // 1. Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF resume file.',
      });
    }

    // 2. Validate PDF mimetype or extension
    const isPdf =
      req.file.mimetype === 'application/pdf' ||
      req.file.originalname.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file format. Please upload a PDF file (.pdf).',
      });
    }

    // 3. Extract text from PDF buffer
    let pdfData;
    try {
      pdfData = await pdfParse(req.file.buffer);
    } catch (pdfErr) {
      console.error('[PDF Parsing Library Error]:', pdfErr);
      return res.status(422).json({
        success: false,
        message: 'Could not extract text from this PDF. Please ensure it is a valid, readable PDF document.',
      });
    }

    const extractedText = pdfData.text ? pdfData.text.trim() : '';

    if (!extractedText) {
      return res.status(422).json({
        success: false,
        message: 'The uploaded PDF appears to be empty or contains scanned images without selectable text.',
      });
    }

    // 4. Send extracted text to Gemini (or heuristic fallback) for structured parsing
    const structuredResume = await parseResumeWithAI(extractedText);

    // Provide default resume name based on candidate name or file name
    const defaultTitle = structuredResume.personalInfo.fullName
      ? `${structuredResume.personalInfo.fullName} Resume`
      : req.file.originalname.replace(/\.pdf$/i, '') || 'Uploaded Resume';

    return res.status(200).json({
      success: true,
      message: 'Resume parsed successfully. Please review the details in the editor.',
      title: defaultTitle,
      data: structuredResume,
    });
  } catch (error) {
    console.error('[AI Parse Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing uploaded resume.',
    });
  }
};

module.exports = {
  enhanceContent,
  parseUploadedResume,
};
