const Resume = require('../models/Resume');

/**
 * @desc    Get all resumes for the authenticated user
 * @route   GET /api/resumes
 * @access  Private
 */
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .select('title selectedColor templateName updatedAt createdAt')
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    console.error('[Get Resumes Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch your resumes.',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single resume by ID
 * @route   GET /api/resumes/:id
 * @access  Private
 */
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.',
      });
    }

    // Verify ownership: user can only access their own resumes
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to access this resume.',
      });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('[Get Resume By ID Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve resume details.',
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new resume
 * @route   POST /api/resumes
 * @access  Private
 */
const createResume = async (req, res) => {
  try {
    const {
      title,
      personalInfo,
      summary,
      skillCategories,
      projects,
      education,
      experience,
      internships,
      certifications,
      achievements,
      languages,
      volunteerExperience,
      selectedColor,
      templateName,
    } = req.body;

    const resumeTitle = title && title.trim() ? title.trim() : 'Untitled Resume';

    // Build the new resume payload with user ownership
    const newResume = new Resume({
      user: req.user._id,
      title: resumeTitle,
      personalInfo: personalInfo || {
        fullName: req.user.name || '',
        email: req.user.email || '',
        phone: '',
        profession: '',
        linkedin: '',
        website: '',
        profileImage: '',
      },
      summary: summary || '',
      skillCategories: skillCategories || [],
      projects: projects || [],
      education: education || [],
      experience: experience || [],
      internships: internships || [],
      certifications: certifications || [],
      achievements: achievements || [],
      languages: languages || [],
      volunteerExperience: volunteerExperience || [],
      selectedColor: selectedColor || '#1e3a8a',
      templateName: templateName || 'classic',
    });

    const savedResume = await newResume.save();

    return res.status(201).json({
      success: true,
      message: 'Resume created successfully.',
      data: savedResume,
    });
  } catch (error) {
    console.error('[Create Resume Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create resume.',
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing resume
 * @route   PUT /api/resumes/:id
 * @access  Private
 */
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.',
      });
    }

    // Verify ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to modify this resume.',
      });
    }

    // Update fields if provided in request body
    const updatableFields = [
      'title',
      'personalInfo',
      'summary',
      'skillCategories',
      'projects',
      'education',
      'experience',
      'internships',
      'certifications',
      'achievements',
      'languages',
      'volunteerExperience',
      'selectedColor',
      'templateName',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        resume[field] = req.body[field];
      }
    });

    const updatedResume = await resume.save();

    return res.status(200).json({
      success: true,
      message: 'Resume updated successfully.',
      data: updatedResume,
    });
  } catch (error) {
    console.error('[Update Resume Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update resume.',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a resume
 * @route   DELETE /api/resumes/:id
 * @access  Private
 */
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.',
      });
    }

    // Verify ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to delete this resume.',
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Resume deleted successfully.',
      data: { id: req.params.id },
    });
  } catch (error) {
    console.error('[Delete Resume Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete resume.',
      error: error.message,
    });
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
