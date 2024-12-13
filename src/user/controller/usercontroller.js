//import core modules
import path from 'path'
import jwt from 'jsonwebtoken'

//user modules
import { userModal } from '../model/model.js';

export class userController {
    //Register user
    static RegisterUser(req,res){
        const {name,email,password} = req.body;

        let imageUrl = null;

        if(req.file){
            imageUrl =path.join('uploads','userProfile',req.file.filename);
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

    //Get User details
    static getDetail(req,res){
        const userId = req.userId;
        if(!userId){
            return res.status(401).send("Unauthorized");
        }

        const user = userModal.userbyId(userId);

        if(!user){
            return res.status(400).send("User not found");
        }

        res.status(200).send({
            "name":user.name,
            "email":user.email,
            "imageUrl":user.ImageUrl,
        });
    }

    //Update User Details
    static updateDetails(req,res){
        
        //get data from req
        const userId = req.userId;
        const name = req.body.name;
        const password = req.body.password;
        let ImageUrl;

        if(!userId){
            return res.status(401).send({success:false,message:"Unauthorized"});
        }

        //get file from req.file
        if(req.file){   
            ImageUrl =path.join('uploads','userProfile',req.file.filename);
        }

        //update details
        try{
            userModal.updateUser(userId,name,password,ImageUrl);
        }catch(error){
            return res.status(400).send({success:false,message:error.message});
        }

        return res.status(200).send({success:true,message:"Updates Successfully"});
    }
}