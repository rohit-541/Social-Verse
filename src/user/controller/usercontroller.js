import path from 'path'
import jwt from 'jsonwebtoken'

import { userModal } from '../model/model.js';

export class userController {
    //Register user
    static RegisterUser(req,res){
        console.log(req.body);
        const {name,email,password} = req.body;

        const imageUrl = null;

        if(req.file){
            imageUrl =path.join('uploads','profileImage',req.file.filename);
        }
        try{
            userModal.registerUser(name,email,password,imageUrl);
            return res.status(200).send({success:true,message:"User is successfully registered"});
        }catch(error){
            res.status(400).send(error);
        }    
    }

    //Login user
    static login(req,res){
        const {email,password} = req.body;
        const result = userModal.confirmLogin(email,password);

        if(result == false){
            return res.status(400).send("Invalid Credentials")
        }

        const token = jwt.sign({
            "email":email,
            "userId":result,
        },"frm7MFZRjHeuT3db9mZu4snyjai1e0zm",{
            expiresIn:'2d',
        });
        
        res.status(200).send({success:true,message:"Login successfull",token:token});
    }
}