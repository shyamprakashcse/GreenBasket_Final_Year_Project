const jwt = require('jsonwebtoken');
const config = require('../config');
const userInfo = {}

function getToken(payload) {
    const accessToken = jwt.sign(payload, config.secretkey, { expiresIn: 60 * 3 });
    return accessToken;
}

function setUserPayload(payload) {
    this.userInfo = payload;
}

function getUserPayload(token) {
    const userpayload = jwt.verify(token, config.secretkey);
    return userpayload;
}

function getRefreshToken(userpayload) {
    const payload = userpayload;
    const refreshToken = jwt.sign(payload, config.secretkey, { expiresIn: 60 * 60 });
    return refreshToken;
}
module.exports = { getToken, setUserPayload, getUserPayload, getRefreshToken };