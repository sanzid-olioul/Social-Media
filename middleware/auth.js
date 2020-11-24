const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =(req,res,next)=>{
    const token = req.header('x-auth-token'); //To get Token from header

    if(!token){
        return res.status(401).json({msg: 'No token, aithentication denied '}); //Denied If not token
    }

    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));//Veryfiying token

        req.user = decoded.user;
        next();

    }catch(err){
        res.status(401).json({msg: 'Token is not valid '});
        
    }







}