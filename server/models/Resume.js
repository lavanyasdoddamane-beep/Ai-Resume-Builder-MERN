const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema(
  {
    id: { type: String },
    categoryName: { type: String, required: true },
    skills: [{ type: String }],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    id: { type: String },
    projectName: { type: String, default: '' },
    role: { type: String, default: '' },
    technologies: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    projectUrl: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    id: { type: String },
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    fieldOfStudy: { type: String, default: '' },
    startYear: { type: String, default: '' },
    endYear: { type: String, default: '' },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    id: { type: String },
    jobTitle: { type: String, default: '' },
    company: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const internshipSchema = new mongoose.Schema(
  {
    id: { type: String },
    role: { type: String, default: '' },
    organization: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    technologies: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, default: '' },
    organization: { type: String, default: '' },
    issueDate: { type: String, default: '' },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const achievementSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const languageSchema = new mongoose.Schema(
  {
    id: { type: String },
    language: { type: String, default: '' },
    proficiency: { type: String, default: '' },
  },
  { _id: false }
);

const volunteerSchema = new mongoose.Schema(
  {
    id: { type: String },
    organization: { type: String, default: '' },
    role: { type: String, default: '' },
    dates: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a resume title/name'],
      trim: true,
      default: 'Untitled Resume',
    },
    personalInfo: {
      fullName: { type: String, required: [true, 'Full name is required'], default: '' },
      email: { type: String, required: [true, 'Email address is required'], default: '' },
      phone: { type: String, default: '' },
      profession: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website: { type: String, default: '' },
      profileImage: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    skillCategories: [skillCategorySchema],
    projects: [projectSchema],
    education: [educationSchema],
    experience: [experienceSchema],
    internships: [internshipSchema],
    certifications: [certificationSchema],
    achievements: [achievementSchema],
    languages: [languageSchema],
    volunteerExperience: [volunteerSchema],
    selectedColor: {
      type: String,
      default: '#1e3a8a', // Default dark blue
    },
    templateName: {
      type: String,
      default: 'classic',
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
