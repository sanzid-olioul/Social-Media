const express = require('express');
const router = express.Router();


// @route   GET api/Profile

// @desc    Rest route

// @access  Public

router.get('/',(req,res)=> res.send('Profile routes'));

module.exports = router;