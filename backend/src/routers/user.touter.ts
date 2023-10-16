import { Router } from "express";
import { sample_users } from "../data";
import  jwt  from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User, UserModel, UserSchema } from "../models/user.model";

const router = Router();



router.post("/login",asyncHandler(
    async(req, res) =>{
        const { email, password} = req.body;
        const user = await UserModel.findOne({email, password});
            if(user){
                res.send(generateTokenResponse(user));
            } else{
                const BAD_REQUEST = 400;
                res.status(BAD_REQUEST).send("User name or password is not valid !")
            }
    }
))


const generateTokenResponse = (user: User) =>{
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!, {
        expiresIn: "600d"
    });

    // user.token = token;
    // return user;

    return {
        id: user.id,
        email: user.email,
        name: user.email,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}

export default router;