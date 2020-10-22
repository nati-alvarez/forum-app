const UserModel = require("../models/users/index");
const bcrypt = require("bcrypt");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

class AuthController {
    static renderLoginPage(req, res) {
        if(req.session.user) return res.redirect("/");
        res.render("login");
    };

    static renderSignupPage(req, res){
        if(req.session.user) return res.redirect("/");
        res.render("signup");
    }

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

    static async signup(req, res){
        try {
            const tmpPfp = (req.file)? req.file.path: null;
            const {username, password, pfp, bio, public: isPublic} = req.body;
            if(!username || !password) return res.status(400).json({err: "Username and password required"});
            const hash = bcrypt.hashSync(password, 14);

            const userExists = await UserModel.findByUsername(username);
            if(userExists) return res.status(401).json({err: "Username taken"});

            if(tmpPfp){
                //uploads image to cloudinary and gets back url to image if file was uploaded
                cloudinary.uploader.upload(tmpPfp, async (err, result)=>{
                    fs.unlinkSync(tmpPfp);
                    if(result){
                        const user = await UserModel.createUser(username, hash, result.secure_url,  bio, isPublic)
                        .returning("id", "username", "pfp");
                        req.session.user = {
                            id: user.id,
                            username: user.username,
                            pfp: user.pfp
                        }
                        res.status(201).json({messge: "Signup successful"});
                    } else{
                        console.log(err);
                        res.status(500).json({err: "A server error occurred, please try again."});
                    }
                });
            }else {
                //if no pfp is provided, use default value in db
                const user = await UserModel.createUser(username, hash, tmpPfp, bio, isPublic);
                console.log(user);
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    pfp: user.pfp
                }
                console.log("FROM CONTROLLER: ", req.session.user)
                res.status(201).json({messge: "Signup successful"});
            }
        }catch(err){
            res.status(500).json({message: "A server error occurred, please try again"});
        }
    }
}

module.exports = AuthController;