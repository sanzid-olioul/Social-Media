const express = require('express');
const router = express.Router();


// @route   GET api/Posts

// @desc    Rest route

// @access  Public

router.get('/',(req,res)=> res.send('Post routes'));

module.exports = router;