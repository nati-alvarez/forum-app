class AuthMiddleware  {
    static isAuthenticated(req, res, next){
        console.log(req.session.user)
        if(!req.session.user){
           return res.redirect("/");
        }
        next();
    }
}

module.exports = AuthMiddleware;