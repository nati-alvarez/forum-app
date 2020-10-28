const db = require("../db");

class CommunityModel {
    static queryBuilder = db;

    static async getCommunity(nameSlug){
        const community = await this.queryBuilder("Community")
        .join("User", "User.id", "Community.owner_id")
        .where({name: nameSlug})
        .select("Community.id as community_id", "Community.name as community_name", "Community.icon as community_icon",
        "Community.banner as community_banner", "Community.description as community_description",
        "User.id as owner_id", "User.username as owner_username", "User.pfp as owner_pfp")
        .first();

        const posts = await this.queryBuilder("Post")
        .join("User", "User.id", "Post.author_id")
        .leftJoin("View", "View.post_id", "Post.id")
        .leftJoin("Comment", "Comment.post_id", "Post.id")
        .leftJoin("Post_Vote as Like", function(){
            this.on("Like.post_id", "Post.id");
            this.andOn("Like.status", ">", 0);
        })
        .leftJoin("Post_Vote as Dislike", function(){
            this.on("Dislike.post_id", "Post.id");
            this.andOn("Dislike.status", "<", 0);
        })
        .where("Post.community_id", community.community_id)
        .groupBy("Post.id", "User.id")
        .select("Post.id as post_id", "Post.title as post_title", "Post.body as post_body",
        "User.id as author_id", "User.username as author_username", "User.pfp as author_pfp")
        .limit("20")
        .countDistinct({views: "View.user_id", comments: "Comment.id", likes: "Like.user_id", dislikes: "Dislike.user_id"});

        community.posts = posts;
        return community;

    }
}

module.exports = CommunityModel;