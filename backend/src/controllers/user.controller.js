const {userService} = require("../services");

const resign = async (req, res) => {
    try {
        const result = await userService.resign(req);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"message": error.message});
    }    
};

const checkResign = async (req, res) =>{
    try {
        const result = await userService.checkResign(req.session.userId);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({"message": error.message});
    } 
};

const responses = async (req, res) => {
    try {
        await userService.responses(req);
        res.status(200).send();
    } catch (error) {
        res.status(500).send({"message": error.message});
    }    
};

const getUser = async (req, res) => { 
    if(req.session.userId){
        const { role, username} = req.session;        
        res.json({ role, username }); 
    }else {
        res.redirect("/");
    }
}
const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ status: false, message: "Logout failed" });
        res.clearCookie("connect.sid"); 
        res.json({ status: true, message: "Logged out successfully" });
    });
};

module.exports = {resign, checkResign, responses, getUser, logout};