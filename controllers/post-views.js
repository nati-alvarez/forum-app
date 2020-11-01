const PostViewModel = require("../models/post_views/index");

class PostViewController {
    static async createView(req, res){
        try{
            const {post_id} = req.body;
            const viewExists = await PostViewModel.viewExists(post_id, req.user.id);
            if(viewExists) return res.status(400).json({message: "View already exists"});
            
            const newView = await PostViewModel.createView(post_id, req.user.id);
            if(newView.rowCount > 0) res.status(201).json({message: "View added"});
        }catch(err){
            console.log(err);
            res.status(500).json({message: "A server error occurred"});
        }
    }
}

module.exports = PostViewController;