const Interest = require("../models/interest.model");

async function getAllInterests(req, res, next) {
    try {
        const allInterests = await Interest.find();

        return res.status(200).json({
            status: "success",
            message: "All interests fetched successfully",
            data: {
                interests: allInterests,
            },
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllInterests}
