const db = require("../db");

class PostVoteModel {
    static queryBuilder = db;

    static async vote(post_id, user_id, status){
        //first check if vote exists
        const vote = await db("Post_Vote").where({post_id, user_id}).first();

        if(vote){
            //unlike if already liked
            if(vote.status > 0 && status > 0) {
                await db("Post_Vote").where({id: vote.id}).del();
                return null;
            }
            //undislike if already disliked
            else if (vote.status < 0 && status < 0){
                await db("Post_Vote").where({id: vote.id}).del();
                return null;
            }
            //change to like if disliked and vice versa
            else if(vote.status !== status){
                return db("Post_Vote").where({id: vote.id}).update({status}).returning("id", "status");
            }
        }else {
            return db("Post_Vote").insert({user_id, post_id, status}).returning("id", "status");
        }
    }
}

module.exports = PostVoteModel;