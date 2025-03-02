const passport = require("passport"); 

const verifyCallback = (req, resolve, reject) => (err, user, info) => {
    if(err || !user){
        throw new Error("Please authenticate");
    }else{
        req.user = user;
        resolve();
    }
}; 

const auth = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject)
        )(req, res, next);
    })
    .then(() => next())
    .catch((err) => next(err));
}; 

module.exports = {auth};