const db = require("../db");

class UsersModel {
    static queryBuilder = db;

    static findByUsername(username){
        return this.queryBuilder("User")
        .where({username}).first()
        .select("id", "username", "pfp", "password");
    }

    static async createUser(username, password, pfp, bio, isPublic){
        const values = {username, password, bio, public: isPublic}
        if(pfp) values.pfp = pfp;

        const userId = await this.queryBuilder("User")
        .returning("id")
        .insert(values)

        return this.queryBuilder("User")
        .where({id: userId[0]}).first()
        .select("id", "username", "pfp");
    }
}

module.exports = UsersModel;