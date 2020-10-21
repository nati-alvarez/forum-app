const UserModel = require("../models/users/index");
const bcrypt = require("bcrypt");

class AuthController {
    static renderLoginPage(req, res) {
        if(req.session.user) return res.redirect("/");
        res.render("login");
    };

    static async login(req, res){
        const {username, password} = req.body;
        if(!username || !password) return res.status(400).json({err: "Username and password required"});

        const user = await UserModel.findByUsername(username);
        if(!user) return res.status(401).json({err: "Incorrect username or password"});
        
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if(!passwordsMatch) return res.status(401).json({err: "Incorrect username or password"});

        req.session.user = {
            id: user.id,
            username: user.username,
            pfp: user.pfp
        }
        res.status(200).json({message: "Login successful"});
    }
}

module.exports = AuthController;