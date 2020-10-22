const db = require("../db");

class UsersModel {
    static queryBuilder = db;

    static findByUsername(username){
        return this.queryBuilder("User")
        .where({username}).first()
        .select("id", "username", "pfp", "password");
    }

    static createUser(username, password, pfp, bio, isPublic){
        return this.queryBuilder("User")
        .insert({username, password, pfp, bio, public: isPublic})
    }
}

module.exports = UsersModel;