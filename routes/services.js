const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Dummy data fallback if DB is empty
const dummyServices = [
  // Development
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    category: 'Development',
    icon: 'code',
  },
  {
    title: 'App Development',
    description: 'Cross-platform mobile app development for Android and iOS.',
    category: 'Development',
    icon: 'smartphone',
  },

  // Project Assistance
  {
    title: 'Major Project',
    description: 'Comprehensive support for your final year or capstone projects.',
    category: 'Project Assistance',
    icon: 'book-open',
  },
  {
    title: 'Minor Project',
    description: 'Guidance and implementation for smaller academic projects.',
    category: 'Project Assistance',
    icon: 'file-code',
  },
  {
    title: 'MTech Project',
    description: 'Specialized assistance for MTech and postgraduate project work.',
    category: 'Project Assistance',
    icon: 'graduation-cap',
  },

  // Research Assistance
  {
    title: 'PhD Guidance',
    description: 'Expert mentorship for PhD research, proposal, and thesis.',
    category: 'Research Assistance',
    icon: 'user-graduate',
  },
  {
    title: 'Code Implementation',
    description: 'Implementation of research algorithms and models in code.',
    category: 'Research Assistance',
    icon: 'terminal',
  },
  {
    title: 'Documentation',
    description: 'Professional documentation for research and academic projects.',
    category: 'Research Assistance',
    icon: 'file-text',
  },
  {
    title: 'Paper Writeup',
    description: 'Assistance with writing and formatting research papers.',
    category: 'Research Assistance',
    icon: 'edit-3',
  },

  // Internships
  {
    title: 'Certifications',
    description: 'Industry-recognized certifications with hands-on training.',
    category: 'Internships',
    icon: 'award',
  },
  {
    title: 'Project Implementations',
    description: 'Real-world project experience as part of internship programs.',
    category: 'Internships',
    icon: 'briefcase',
  },

  // Tutoring
  {
    title: 'BTech Subjects',
    description: 'Tutoring for core BTech subjects by experienced educators.',
    category: 'Tutoring',
    icon: 'book',
  },
  {
    title: 'Programs',
    description: 'One-on-one programming help and problem-solving sessions.',
    category: 'Tutoring',
    icon: 'users',
  },
];

router.get('/', async (req, res) => {
  try {
    let services = await Service.find();
    if (!services.length) {
      // If DB is empty, return dummy data
      services = dummyServices;
    }
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
});

module.exports = router;