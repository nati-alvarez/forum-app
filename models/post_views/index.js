const db = require("../db");

class PostViewModel {
    static queryBuilder = db;

    static async createView(post_id, user_id){        
        const newView = await db("View").insert({post_id, user_id});
        return newView;
    }

    static async viewExists(post_id, user_id){
        const viewExists = await db("View").where({post_id, user_id}).first();
        if(viewExists) return true;
    }
}

module.exports = PostViewModel;