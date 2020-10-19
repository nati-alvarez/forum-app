const PostsModel = require("../models/posts");

class PostsController {
    static async getAll(req, res){
        try{
            const {category, keyword, startFrom} = req.query;
            const posts = await PostsModel.getAll(category, keyword, startFrom);
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
            res.render("post-page", {post, err: null});
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = PostsController;