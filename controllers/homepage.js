const PostsModel = require("../models/posts/index");

class HomepageController {
    static async renderHomepage(req, res){
        try{
            const posts = await PostsModel.getAll();
            res.render("homepage", {posts, err: null, user: req.session.user});
        }catch(err){
            console.log(err);
            res.render("homepage", {err, posts: null, user: req.session.user});
        }
    }
}

module.exports = HomepageController;