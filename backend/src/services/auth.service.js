const { User } = require("../models");

const login = async (email, password)=>{
    const user = await User.findOne({email});
    if(!user)
        throw new Error('User not found');
 
    if(!(await user.isPasswordMatch(password)))
        throw new Error('Incorrect Password');
    
    return user;
};

module.exports = { login };