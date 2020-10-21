const PostsModel = require("../models/posts/index");

class HomepageController {
    static async renderHomepage(req, res){
        console.log(req.session);
        try{
            const posts = await PostsModel.getAll();
            res.render("homepage", {posts, err: null});
        }catch(err){
            console.log(err);
            res.render("homepage", {err, posts: null});
        }
    }
}

module.exports = HomepageController;