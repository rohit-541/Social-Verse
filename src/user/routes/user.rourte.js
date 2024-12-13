//import core modules
import express from "express";

//import user modules
import { userController } from "../controller/usercontroller.js";
import { auth } from "../../Middlewares/Authorization.js";
import {uploadUser} from "../../Middlewares/FileUploadUser.js";

export const router = express.Router();

//post routes
router.post('/login',userController.login);
router.post('/register',uploadUser.single('ProfileImage'),userController.RegisterUser);

//get routes
router.get('/detail',auth,userController.getDetail);

//put routes
router.put('/update',auth,uploadUser.single('ProfileImage'),userController.updateDetails);

//Only test api
router.get('/secure',auth,(req,res) =>{
    res.send("Secure");
    console.log(req.userId);
})