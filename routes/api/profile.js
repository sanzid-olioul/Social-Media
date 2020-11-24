const express = require('express');
const { check, validationResult } = require('express-validator');
const auth =require('../../middleware/auth');
const { populate } = require('../../models/Profile');
const Profile = require('../../models/Profile');
const router = express.Router();


// @route   GET api/Profile

// @desc    Rest route

// @access  Private

router.get('/me',auth, async(req,res)=> {
    try{
        const profile = await Profile.findOne({user : req.user.id}).populate(
            'user',
            ['name','avatar']
        );
        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



// @route   POST api/Profile

// @desc    Create or Update user profile

// @access  Private

router.post('/',
    [
        auth,
        [
            check('status','Status is required').not().isEmpty(),
            check('skills','Status is required').not().isEmpty(),
        ]
    ], async(req,res)=>{
         const errors = validationResult(req);
         if(!errors.isEmpty()){
             return res.status(400).json({errors: errors.array()})
         }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(githubusername) profileFields.githubusername = githubusername
        if(skills){
            profileFields.skills = skills.split(',').map(skil=> skil.trim());
        }

        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;

        try{
            let profile = Profile.findOne({user: req.user.id});

            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set : profileFields},
                    {new: true}
                );
                return res.json(profile);
            }

            //Create

            profile = new Profile(profileFields);

            await profile.save();
            res.json(Profile);


        }catch(err){
            res.status(500).send('Server Error...');
        }

    });

// @route   GET api/Profile

// @desc    get all profiles

// @access  public

router.get('/',async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avator']);
        res.json(profiles);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/Profile/user/:user_id

// @desc    get profile by ID

// @access  public

router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avator']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profile);

    }catch(err){
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/Profile

// @desc    get all profiles

// @access  public

router.delete('/',auth,async (req,res)=>{
    try{
        await Profile.findOneAndDelete({user :  req.params.user_id});


        await User.findOneAndDelete({user :  req.params.user_id});
        res.json({msg:"Profile deleted"});

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/Profile/experience

// @desc    get all profiles

// @access  private

router.put('/experience',[auth,
    [check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {
        title,
        company,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        from,
        to,
        current,
        description
    }
    try{

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }


})



module.exports = router;