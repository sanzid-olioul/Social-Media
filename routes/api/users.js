const express = require('express');
const router = express.Router();


// @route   GET api/Users

// @desc    Rest route

// @access  Public

router.get('/',(req,res)=> res.send('User routes'));

module.exports = router;