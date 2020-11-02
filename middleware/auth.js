const userModel = require("../models/users/index");

class AuthMiddleware  {
    //for routes with optional auth
    static async isAuthenticated(req, res, next){
        if(!req.session.user) return next();
        const userId = req.session.user.id;
        const user = await userModel.queryBuilder("User").where({id: userId}).first();;
        const {id, username, public: isPublic, bio, pfp} = user;
        req.user = {
            id,
            username,
            isPublic,
            bio,
            pfp
        };
        next();
    }

    static apiProtected(req, res, next){
        if(!req.user) return res.status(403).json({message: "Access denied"});
        next();
    }

    static protected(req, res, next){
        if(!req.user) return res.redirect("/");
        next();
    }
}

module.exports = AuthMiddleware;