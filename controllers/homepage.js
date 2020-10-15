const PostsModel = require("../models/posts/index");

class HomepageController {
    static async renderHomepage(req, res){
        try{
            const posts = await PostsModel.getAll();
            res.render("homepage", {posts});
        }catch(err){
            console.log(err);
            res.render("homepage", {err});
        }
    }
}

module.exports = HomepageController;