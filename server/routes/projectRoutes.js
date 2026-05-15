const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  getProjectById,
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getProjects).post(protect, authorize('admin', 'super_admin'), createProject);
router.route('/:id').get(getProjectById);

module.exports = router;
