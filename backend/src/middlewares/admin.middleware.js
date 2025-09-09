const checkAdmin = (req, res, next) => {
    if(req.session.role === "HR"){
        next();
    }else{
        redirect("/");    
    }
};

module.exports = {checkAdmin};