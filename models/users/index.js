const db = require("../db");

class UsersModel {
    static queryBuilder = db;

    static findByUsername(username){
        return this.queryBuilder("User")
        .where({username}).first()
        .select("id", "username", "pfp", "password");
    }
}

module.exports = UsersModel;