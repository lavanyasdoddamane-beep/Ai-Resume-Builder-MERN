const express = require('express');
const router = express.Router();
const multer = require('multer');
const { enhanceContent, parseUploadedResume } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

// Configure Multer for in-memory PDF uploads (max 5MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF documents are allowed for resume upload!'), false);
    }
  },
});

// All AI routes are protected
router.use(protect);

// Route to enhance section content using Gemini AI
router.post('/enhance', enhanceContent);

// Route to upload and parse PDF resume using Gemini AI
router.post('/parse-resume', upload.single('resume'), parseUploadedResume);

module.exports = router;
