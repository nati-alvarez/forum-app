class AuthMiddleware  {
    static isAuthenticated(req, res, next){
        if(!req.session.user){
           res.redirect("/");
        }
        next();
    }
}

export default AuthMiddleware;