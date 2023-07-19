const jwt = require('jsonwebtoken');
const blogModel = require("../Model/blogsModel");
const mongoose = require('mongoose');



//======================================= Authencation ====================================

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: "Token must be present" });
        jwt.verify(token, "FunctionUp-Blog-Library", (err, decode) => {
            if (err) {
                return res.status(401).send({ status: false, msg: "Error : Invalid Token or Expired Token" })
            } 
            req.token = decode

            next();
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};





//======================= Exported Module ============================



module.exports.authenticate = authenticate;
