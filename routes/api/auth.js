const express = require('express');
const router = express.Router();


// @route   GET api/Auth

// @desc    Rest route

// @access  Public

router.get('/',(req,res)=> res.send('Auth routes'));

module.exports = router;