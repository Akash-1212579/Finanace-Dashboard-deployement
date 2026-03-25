const {getProfileInfo} = require("../services/profile.service");

async function getProfileInfoHandler(req,res) {
    try {
        if(!req.userId)
        {
            return res.status(401).json({
                message : "Failed to get userId"
            })
        }
        const userId = req.userId;
        const profileData = await getProfileInfo(userId);

        res.status(200).json(profileData);
    } catch (error) {
        console.log("error from getProfileInfoHandler ",error)
        res.status(401).json({
            message : "Failed to Fetch Profile Data",
            error : error
        })
    }
}
module.exports = {getProfileInfoHandler};