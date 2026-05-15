const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactMessages,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', submitContactForm);
router.get('/', protect, authorize('admin', 'super_admin'), getContactMessages);

module.exports = router;
