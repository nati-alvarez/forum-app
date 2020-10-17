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
}

module.exports = PostsController;