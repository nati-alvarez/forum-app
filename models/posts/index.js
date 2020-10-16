const db = require("../db");

class PostsModel {
    static queryBuilder = db;
    
    static getAll(category, keyword){
        const categories = {"Best": "likes", "Popular": "views", "New": "Post.id"};
        const query =  this.queryBuilder("Post")
        .join("Community", "Post.community_id", "Community.id")
        .join("User", "Post.author_id", "User.id")
        .leftJoin("View", "Post.id", "View.post_id")
        .leftJoin("Comment", "Post.id", "Comment.post_id")
        .leftJoin("Post_Vote", function(){
            this.on("Post_Vote.post_id", "Post.id");
            this.andOn("Post_Vote.status", ">", 0)
        })
        .groupBy("Community.id", "Post.id", "User.id")
        .countDistinct({views: "View.post_id", comments: "Comment.id", likes: "Post_Vote.id"})
        .select("Community.id as community_id", "Community.name as community_name",
        "Community.icon as community_icon", "Post.id as post_id", 
        "Post.title as post_title", "Post.body as post_body",
        "User.username as author_username", "User.pfp as author_pfp",
        "User.id as author_id");
        if(keyword){
            query.where(db.raw('LOWER("Post".title) LIKE LOWER(?)', ['%' + keyword + '%']));
        }
        if(category){
            query.orderBy(categories[category], "desc");
        }
        return query;
    }

    static getById(id){
        return this.queryBuilder("Post")
        .where({id})
        .first();
    }
}

module.exports = PostsModel;