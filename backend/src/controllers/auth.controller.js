const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");

const register = async (req, res) => {
    try {
        const user = await userService.register(req);
        res.status(201).send({"message": "User registered successfully"});
    } catch (error) { 
        res.status(500).send({"message": error.message});
    }    
};

const login = async (req, res) => {
    const {username, password} = req.body;

    if(username =="" || password =="")
        res.status(500).send({"message": "Invalid Request"});
    
    try {
        const user = await authService.login(username, password);
        const token = await tokenService.generateAuthTokens(user);
        res.status(200).send(token);
    } catch (error) { 
        res.status(500).send({"message": error.message});
    }    
};

module.exports = {register, login};