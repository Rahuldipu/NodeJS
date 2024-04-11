const jwt = require("jsonwebtoken");
const { JWT_DECODE_ERR, REFRESH_TOKEN_ERR } = require("../errors");
const { JWT_SECRET , JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY, ACCESS_TOKEN_EXPIRY} = require("../config");

exports.createJwtToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    return token;
};

exports.createRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRY});
    return refreshToken;
}

exports.verifyJwtToken = (token, next) => {
    try {
        const { userId } = jwt.verify(token, JWT_SECRET);
        return userId;
    } catch (err) {
        next(err);
    }
};

exports.verifyRefreshToken = (token, next) => {
    try {
        const { userId } = jwt.verify(token, JWT_REFRESH_SECRET);
        return userId;
    } catch (err) {
        next({ status: 403, message: REFRESH_TOKEN_ERR });;
    }
};
