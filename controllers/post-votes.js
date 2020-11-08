const PostVotesModel = require("../models/post_votes/index");

class PostVotesController {
    static async vote(req, res){
        try {
            const {post_id, status} = req.body;
            if(!post_id || !status) return res.status(400).json({message: "Post id and status requried"});
            
            const vote = await PostVotesModel.vote(post_id, req.user.id, status);
            if(vote === null) return res.status(204).json({message: "Vote removed"});
            res.status(201).json(vote);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: "A server error occurred"});
        }
    }
}

module.exports = PostVotesController;