import fs from 'fs'
import path from 'path'

import AppError from "../../Error/Error.js";

export class userModal{
    //Constructor of class
    constructor(name,email,password,ImageUrl){
        this.userId = userModal.generateId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.ImageUrl = ImageUrl;
        this.posts = [];
        this.likedPosts = [];
    }

    //container
    static usersDb = [];

    //to generate id
    static generateId(){
        return Date.now().toString()+(Math.random()*1000).toFixed();
    }

    //return all users whenever required
    static getAll(){
        return this.usersDb;
    }

    //returns a single user based on id 
    static userbyId(userId){
        const user = this.usersDb.find(p=>p.userId == userId);
        return user;
    }

    //registers new user based on provided data
    static registerUser(name,email,password,ImageUrl){
        //check if user email exists already
        const user = this.usersDb.find(p=>p.email == email);
        if(user){
            throw new AppError(400,"User already Exists");
        }

        //If not already present create new
        const newUser = new userModal(name,email,password,ImageUrl);
        this.usersDb.push(newUser);
        return newUser;
    }

    //confirms login if user is present or not
    static confirmLogin(email,password){
        const user = this.usersDb.find(p=>p.email == email && p.password == password);

        if(user == null){
            return false;
        }else{
            return user.userId;
        }
    }
    
    //updates the detailes of user
    static updateUser(userID,name,password,ImageUrl){
        const user = this.usersDb.find(p=>p.userId == userID);
        if(user){
            if(name){
                user.name = name;
            }
            if(password){
                user.password = password;
            }
            
            if(ImageUrl){

                if(user.ImageUrl){
                    const prevLoc = path.join(path.resolve(),"public",user.ImageUrl);
                    console.log(prevLoc);
                    fs.unlinkSync(prevLoc,(err)=>{
                        //ToDo: Log this error using winston
                        console.log("Error while removing file ",err);
                        throw new Error('Server Error');
                    })
                }
                
                user.ImageUrl = ImageUrl;
            }
        }else{
            throw new AppError(400,"User not found");
        }
    }
}

//Testing code
userModal.registerUser("Rohit","rohit@gmail.com","123",null);
userModal.usersDb[0].userId = "541";
