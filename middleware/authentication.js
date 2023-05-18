import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Token Unavailable" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Token is invalid", error: error.message });
    }
};

export default verifyToken;

export const accessRoles=(rolesAllowed)=>{
    return (req,res,next)=>{
        if(rolesAllowed.includes(req.user.role)){
           return next()
        }else{
           return res.status(401).json({status:"failes",message:"not authorized"})
        }
    }
}