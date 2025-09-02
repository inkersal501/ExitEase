const {authService, userService, tokenService} = require("../services"); 

const register = async (req, res) => {
    try {
        await userService.register(req.body);
        res.status(201).send({"message": "User registered successfully"});
    } catch (error) { 
        res.status(500).send({"message": error.message});
    }    
};

const login = async (req, res) => {
    const {email, password} = req.body;

    if(email =="" || password =="")
        res.status(500).send({"message": "Invalid Request"});
    else{
        try {
            const user = await authService.login(email, password);
            const token = await tokenService.generateAuthTokens(user);
            const {role, username} = user;
            res.status(200).send({role, username, token});
        } catch (error) { 
            res.status(500).send({"message": error.message});
        }    
    }
};

module.exports = {register, login};