const db = require("../db");

class PostsModel {
    static queryBuilder = db;
    
    static async getAll(category, keyword, startFrom, communityName){
        const categories = new Map();
        categories.set("Best", "likes");
        categories.set("Popular", "views");
        categories.set("New", "Post.id");

        const query =  this.queryBuilder("Post")
        .join("Community", "Post.community_id", "Community.id")
        .join("User", "Post.author_id", "User.id")
        .leftJoin("View", "Post.id", "View.post_id")
        .leftJoin("Comment", "Post.id", "Comment.post_id")
        .leftJoin("Post_Vote as Like", function(){
            this.on("Like.post_id", "Post.id");
            this.andOn("Like.status", ">", 0);
        })
        .leftJoin("Post_Vote as Dislike", function(){
            this.on("Dislike.post_id", "Post.id");
            this.andOn("Dislike.status", "<", 0);
        })
        .groupBy("Community.id", "Post.id", "User.id")
        .countDistinct({views: "View.user_id", comments: "Comment.id", likes: "Like.id", dislikes: "Dislike.id"})
        .select("Community.id as community_id", "Community.name as community_name",
        "Community.icon as community_icon", "Post.id as post_id", 
        "Post.title as post_title", "Post.body as post_body",
        "User.username as author_username", "User.pfp as author_pfp",
        "User.id as author_id")
        .limit("20");
        if(keyword){
            query.where(db.raw('LOWER("Post".title) LIKE LOWER(?)', ['%' + keyword + '%']));
        }
        if(communityName && communityName != 'undefined'){
            console.log("community name not undefined ", communityName)
            query.where("Community.name", communityName);
        }
        if(category){
            query.orderBy(categories.get(category), "desc");
        } 
        if(startFrom){
            query.offset(startFrom * 20);
        }
        
        const data = await query;
        console.log(data)
        return query;
    }

    static async getById(post_id, user_id){
        console.log(user_id)
        try{
            const post = await this.queryBuilder("Post")
            .join("Community", "Community.id", "Post.community_id")
            .join("User", "User.id", "Post.author_id")
            .leftJoin("View", "View.post_id", "Post.id")
            .leftJoin("Post_Vote as Like", function(){
                this.on("Like.post_id", "Post.id");
                this.andOn("Like.status", ">", 0);
            })
            .leftJoin("Post_Vote as Has_Liked", function(){
                this.on("Has_Liked.post_id", "Post.id");
                this.andOn("Has_Liked.status", ">", 0);
                if(user_id)
                    this.andOn("Has_Liked.user_id", "=", user_id);
            })
            .leftJoin("Post_Vote as Has_Disliked", function(){
                this.on("Has_Disliked.post_id", "Post.id");
                this.andOn("Has_Disliked.status", "<", 0);
                if(user_id)
                    this.andOn("Has_Disliked.user_id", "=", user_id);
            })
            .leftJoin("Post_Vote as Dislike", function(){
                this.on("Dislike.post_id", "Post.id");
                this.andOn("Dislike.status", "<", 0);
            })
            .where({"Post.id": post_id})
            .select("Community.id as community_id", "Community.name as community_name", "Community.description as community_description",
            "Community.icon as community_icon", "Community.owner_id as community_owner", "User.id as author_id", "User.username as author_username", "User.pfp as author_pfp",
            "Post.title as post_title", "Post.body as post_body", "Post.id as post_id", "Has_Liked.id as has_liked", "Has_Disliked.id as has_disliked")
            .countDistinct({views: "View.user_id", likes: "Like.id", dislikes: "Dislike.id"})
            .groupBy("Post.id", "User.id", "Community.id", "Has_Liked.id", 'Has_Disliked.id')
            .first();

            if(!post){
                return null;
            };

            const comments = await this.queryBuilder("Comment")
            .join("User", "User.id", "Comment.user_id")
            .leftJoin("Comment_Vote as Like", function(){
                this.on("Like.comment_id", "Comment.id");
                this.andOn("Like.status", ">", 0);
            })
            .leftJoin("Comment_Vote as Dislike", function(){
                this.on("Dislike.comment_id", "Comment.id");
                this.andOn("Dislike.status", "<", 0);
            })
            .groupBy("Comment.id", "User.id")
            .where({"Comment.post_id": post.post_id})
            .select("Comment.id as comment_id", "Comment.body as comment_body", "User.username as author_username",
            "User.pfp as author_pfp", "User.id as author_id")
            .count({likes: "Like.id", dislikes: "Dislike.id"});

            const replies = await this.queryBuilder("Reply")
            .join("User","User.id", "Reply.user_id")
            .where("Reply.post_id", post.post_id)
            .select("User.username as author_username", "User.pfp as author_pfp",
            "Reply.post_id as post_id", "Reply.comment_id as comment_id",
            "Reply.id as reply_id", "Reply.body as reply_body");

            //using a map here to prevent using nested loops to map replies to 
            //their respective comments (O(n^2) complexity)
            //this solution has a O(n) complexity
            const repliesMap = new Map();
            replies.forEach(reply=>{
                if(repliesMap.has(`${reply.comment_id}`)) {
                    const arr = repliesMap.get(`${reply.comment_id}`);
                    arr.push(reply);
                    repliesMap.set(`${reply.comment_id}`, arr);
                }else {
                    repliesMap.set(`${reply.comment_id}`, [reply]);
                }
            });

            comments.forEach(comment=>{
                comment.replies = repliesMap.get(`${comment.comment_id}`) || [];
            });
            post.comments = comments;
            return post;
        }catch(err){
            console.log(err);
        }
    }

    static async hasViewed(user_id, post_id){
        return this.queryBuilder("View")
        .where({user_id: user_id, post_id: post_id})
        .first();
    }
}

module.exports = PostsModel;