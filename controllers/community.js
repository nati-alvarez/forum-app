const communityModel = require("../models/community/index");

class CommunityController {
    static async renderCommunityPage(req, res){
        try {
            const community = await communityModel.getCommunity(req.params.community_name);
            res.render("community-page", {user: req.user, community});
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = CommunityController;