const db = require("../db");

class PostsModel {
    static queryBuilder = db;
    
    static getAll(){
        return this.queryBuilder("Post")
        .join("Community", "Post.community_id", "Community.id")
        .join("User", "Post.author_id", "User.id")
        .select("Community.id as community_id", "Community.name as community_name",
        "Community.icon as community_icon", "Post.id as post_id", 
        "Post.title as post_title", "Post.body as post_body",
        "User.username as author_username", "User.pfp as author_pfp",
        "User.id as author_id");
    }

    static getById(id){
        return this.queryBuilder("Post")
        .where({id})
        .first();
    }
}

module.exports = PostsModel;