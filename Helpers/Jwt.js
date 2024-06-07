const JWT = require('jsonwebtoken')
const User = require('../Database/UserModel')
const asyncHandler = require('express-async-handler')
const key = process.env.SECRET

const protect = asyncHandler(async (req, resp, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = JWT.verify(token, key)
            req.user = await User.findById(decoded.id).select("-Password")
            next();
        } catch (error) {
            resp.status(401)
            throw new Error("Not Authorized, Token Failed")
        }
    }

    if (!token) {
        resp.status(401)
        throw new Error("Not Authorized, No Token")

    }
})

const generateToken=(id)=>
    {
        return JWT.sign({id},key,{expiresIn:'12h'},)
    }

module.exports = {
    protect,
    generateToken
};