import { Router } from "express";
import { sample_users } from "../data";
import  jwt  from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User, UserModel, UserSchema } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/htttp_status";
import bcrypt from 'bcryptjs'


const router = Router();



router.post("/login",asyncHandler(
    async(req, res) =>{
        const { email, password} = req.body;
        const user = await UserModel.findOne({ email});
            if(user && (await bcrypt.compare(password, user.password))){
                res.send(generateTokenResponse(user));
            } else{
                res.status(HTTP_BAD_REQUEST).send("User name or password is not valid !")
            }
    }
))

router.post('/register', asyncHandler(
    async (req, res) =>{
        const {name, email, password, address} = req.body;
        const user  = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send("User already exist with same Email-Id , please Login !")
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: User = {
            id: null ,
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))



const generateTokenResponse = (user: User) =>{
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!, {
        expiresIn: "600d"
    });

   

    return {
        // id: user.id,
        email: user.email,
        name: user.email,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}

export default router;