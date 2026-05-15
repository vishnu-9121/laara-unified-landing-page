const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category (e.g., Drone, Software, AI)'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    modelUrl: {
      type: String, // For 3D animation metadata
    },
    technologies: [String],
    link: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
