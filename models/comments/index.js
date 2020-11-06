const db = require("../db");

class CommentModel {
    static queryBuilder = db;

    static async createComment(post_id, user_id, body){
        const newId = await db("Comment").insert({post_id, user_id, body}).returning("id");
        return db("Comment")
        .join("User", "User.id", "Comment.user_id")
        .leftJoin("Comment_Vote as Like", function(){
            this.on("Like.comment_id", "Comment.id");
            this.andOn("Like.status", ">", 0);
        })
        .leftJoin("Comment_Vote as Dislike", function(){
            this.on("Dislike.comment_id", "Comment.id");
            this.andOn("Dislike.status", "<", 0);
        })
        .groupBy("Comment.id", "User.id").where({"Comment.id": newId[0]})
        .select("Comment.id as comment_id", "Comment.body as comment_body", "User.username as author_username",
        "User.pfp as author_pfp", "User.id as author_id")
        .count({likes: "Like.id", dislikes: "Dislike.id"})
        .first();
    }
}

module.exports = CommentModel;