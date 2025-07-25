const jwt = require('jsonwebtoken');
const User = require('../models/user')



const auth = async (req,res,next) =>{
   try{
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // console.log('token',token);
    //console.log('id',_id);

    const user = await User.findOne({_id: decoded._id, 'tokens.token':token })
    //console.log(user);
    if(!user){
        throw new Error();
    }
    req.token = token
    req.user = user,
    next();
    
   //console.log(token);
   }catch(e){
    res.status(401).send({error:'Please authenticate'})
   }





}




module.exports = auth;