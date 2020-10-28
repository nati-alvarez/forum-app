const PostsModel = require("../models/posts");

class PostsController {
    static async getAll(req, res){
        try{
            const {category, keyword, startFrom, communityName} = req.query;
            const posts = await PostsModel.getAll(category, keyword, startFrom, communityName);
            res.status(200).json({posts, err: null});
        }catch(err){
            console.log(err);
            res.status(500).json({posts: null, err});
        }
    }

    static async renderPost(req, res){
        try {
            const {post_id} = req.params;
            const post = await PostsModel.getById(post_id);
            if(!post) return res.render("post-page", {post: null, err: null, user: req.session.user});
            res.render("post-page", {post, err: null, user: req.session.user});
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = PostsController;