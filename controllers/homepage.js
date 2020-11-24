const PostsModel = require("../models/posts/index");

class HomepageController {
    static async renderHomepage(req, res){
        try{
            const posts = await PostsModel.getAll(undefined, undefined, undefined, undefined);
            res.render("homepage", {posts, err: null, user: req.user});
        }catch(err){
            console.log(err);
            res.render("homepage", {err, posts: null, user: req.user});
        }
    }
}

module.exports = HomepageController;