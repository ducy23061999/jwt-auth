const jwt = require("jsonwebtoken");
const { func } = require("@hapi/joi");
const Boom = require("@hapi/boom");

export default function auth (req, res, next) {
    const token = req.header('token');
    if (!token) 
        return res.status(401).json({ message: "Auth Error" });
    try {
        const decoded = jwt.verify(token, "randomthing");
        if (decoded.id) {
            next();
            return;
        }
        return res.status(401).json({ message: "Auth Error" });

        
    } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
    }
        
}