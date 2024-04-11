const User = require("../models/user.model");

const {
    PHONE_NOT_FOUND_ERR,
    PHONE_ALREADY_EXISTS_ERR,
    USER_NOT_FOUND_ERR,
    INCORRECT_OTP_ERR,
    ACCESS_DENIED_ERR,
    JWT_DECODE_ERR,
} = require("../errors");

const {
    createJwtToken,
    createRefreshToken,
    verifyRefreshToken,
} = require("../utils/token.util");

const { generateOTP } = require("../utils/otp.util");

// create new user/validate phone number
async function validatePhoneNumber(req, res, next) {
    try {
        let { phone } = req.body;

        // check duplicate phone Number
        let user = await User.findOne({ phone });

        if (!user) {
            // create new user
            const createUser = new User({
                phone,
                role: phone === process.env.ADMIN_PHONE ? "ADMIN" : "USER",
                isValidated: false,
            });

            // save user
            user = await createUser.save();
        }

        // generate otp
        const otp = generateOTP(6);
        // save otp to user collection
        user.otp = otp;
        await user.save();
        // send otp to phone number
        // await fast2sms(
        //     {
        //         message: `Your OTP is ${otp}`,
        //         contactNumber: user.phone,
        //     },
        //     next
        // );

        res.status(200).json({
            message: "success",
        });
    } catch (error) {
        next(error);
    }
}

// verify phone otp
async function verifyPhoneOtp(req, res, next) {
    try {
        const { otp, phone } = req.body;
        const user = await User.findOne({ phone: phone });
        if (!user) {
            console.log("Not user");
            next({ status: 400, message: USER_NOT_FOUND_ERR });
            return;
        }

        // if (user.phoneOtp !== otp) {
        if (otp !== "123456") {
            console.log("Not match");
            next({ status: 400, message: INCORRECT_OTP_ERR });
            return;
        }
        const accessToken = createJwtToken({ userId: user._id });
        const refreshToken = createRefreshToken({ userId: user._id });

        console.log("user id: ", user._id);

        user.otp = "";
        await user.save();

        res.status(201).json({
            status: "success",
            message: "OTP verified successfully",
            data: {
                accessToken,
                refreshToken,
                isRegistered: user.isValidated
            },
        });
    } catch (error) {
        next(error);
    }
}

// refresh token
async function refreshToken(req, res, next) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            next({ status: 400, message: "No refresh token provided" });
            return;
        }

        const userId = verifyRefreshToken(refreshToken, next);

        console.log("user: ", userId);

        if (!userId) {
            next({ status: 403, message: JWT_DECODE_ERR });
            return;
        }

        const user = await User.findById(userId);

        if (!user) {
            next({ status: 404, message: USER_NOT_FOUND_ERR });
            return;
        }

        const accessToken = createJwtToken({ userId: user._id });
        const newRefreshToken = createRefreshToken({ userId: user._id });

        res.status(201).json({
            status: "success",
            message: "Access token refreshed successfully",
            data: {
                accessToken,
                refreshToken: newRefreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
}

// fetch current user
async function fetchCurrentUser(req, res, next) {
    try {
        const currentUser = res.locals.user;

        return res.status(200).json({
            status: "success",
            message: "Current user fetched successfully",
            data: {
                user: currentUser,
            },
        });
    } catch (error) {
        next(error);
    }
}

// Register User
async function registerUser(req, res, next) {
    try {
        const currentUser = res.locals.user;

        console.log("Current: ", currentUser._id);

        const updatedUser = await User.findByIdAndUpdate(
            currentUser._id,
            {...req.body, isValidated: true},
            {new: true}
        );

        return res.status(200).json({
            status: "success",
            message: "Current user updated successfully",
            data: {
                user: updatedUser,
            },
        });
    } catch (error) {
        next(error);
    }
}

// admin access only
async function handleAdmin(req, res, next) {
    try {
        const currentUser = res.locals.user;

        return res.status(200).json({
            status: "success",
            message: "Okay you are admin!!",
            data: {
                user: currentUser,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validatePhoneNumber,
    verifyPhoneOtp,
    fetchCurrentUser,
    handleAdmin,
    refreshToken,
    registerUser,
};
