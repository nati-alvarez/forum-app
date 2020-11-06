const CommentModel = require("../models/comments/index");

class CommentController {
    static async createComment(req, res) {
        try {
            const {post_id, body} = req.body;
            if(!post_id || !body) return res.status(400).json({message: "Post id and comment body required"});
            const newComment = await CommentModel.createComment(post_id, req.user.id, body);
            res.status(201).json(newComment);
        }catch(err){
            console.log(err);
            res.status(500).json({message: "A server error occurred"});
        }
    };
}

module.exports = CommentController;