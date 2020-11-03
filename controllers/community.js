const communityModel = require("../models/community/index");
const fs = require("fs");
const cloudinary = require("../helpers/cloudinary");

class CommunityController {
    static async renderCommunityPage(req, res){
        try {
            const community = await communityModel.getCommunity(req.params.community_name);
            if(req.user) {
                const isMember = await communityModel.isMember(req.user.id, req.params.community_name);
                community.isMember = isMember;
            }
            res.render("community-page", {user: req.user, community});
        }catch(err){
            console.log(err)
        }
    }

    static async renderCreateCommunityPage(req, res){
        res.render("create-community", {user: req.user})
    }

    static async createCommunity(req, res){
        const {name, description} = req.body;
        const {banner, icon} = req.files;
        const tmpBanner = (banner && banner[0])? banner[0].path: null;
        const tmpIcon = (icon && icon[0])? icon[0].path: null;
        
        try {
            if(!req.user.id) return res.status(400).json({err:"You must be logged in to create a community"});
            if(!name || !description) return res.status(400).json({err: "You must fill out all required fields"});
            
            const communityExists = await communityModel.getCommunity(name);
            if(communityExists) return res.status(400).json({err: "Community name taken"});

            let bannerUrl = null;
            let iconUrl = null;
            if(tmpBanner) bannerUrl = await cloudinary.uploadFile(tmpBanner);
            if(tmpIcon) iconUrl = await cloudinary.uploadFile(tmpIcon);

            let result = await communityModel.createCommunity(req.user.id, name, description, bannerUrl, iconUrl);
            if(result.rowCount === 1) res.status(201).json(result);
            else res.status(500).json({err: "Community could not be created, please try again later"});
        }catch(err){
            console.log(err);
            if(err.name !== "Error") return res.status(500).json({err: "A server error occurred"});
            return res.status(500).json({err: err.message});
        }finally {
            //removes files from tmp dir
            //finally runs regardless of return statments in try or catch
            if(tmpBanner) fs.unlinkSync(tmpBanner);
            if(tmpIcon) fs.unlinkSync(tmpIcon);
        }
    }
}

module.exports = CommunityController;