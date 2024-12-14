import AppError from "../../Error/Error.js";
import {userModal}  from "../../user/model/model.js";
import path from 'path'
import fs from 'fs'

export class postModal{

    //Constructor
    constructor(title,content,image,userId){
        this.postId = postModal.generateId();
        this.dateCreated = Date().toString();
        this.title = title;
        this.content = content;
        this.image = image;
        this.userId = userId;
        this.likesCount = 0;
        this.comments = [];
    }

    static postsDb = [];

    //Function to generate random IDs
    static generateId(){
        return Date.now().toString() + (Math.random()*1000).toFixed();
    }

    //create post
    static createPost(userId,title,content,image){
        
        //verify user is present
        const user = userModal.userbyId(userId);
        if(!user){
            throw new AppError(401,"User not found");
        }

        //create new post
        const newPost = new postModal(title,content,image,userId);
        postModal.postsDb.push(newPost);

        //add this post to user
        user.posts.push(newPost.postId);
    }

    //getAll post of users
    static userPost(userId){
        //verify user
        const user = userModal.userbyId(userId);

        if(!user){
            throw new AppError(401,"User not found");
        }

        const allPosts = postModal.postsDb.filter(p=>p.userId == userId);

        return allPosts;
    }

    //Remove a post
    static removePost(postId,userId){

        //verify if user is valid 
        const user = userModal.userbyId(userId);

        if(!user){
            throw new AppError(401,"User not found!");
        }

        //check if any post with that id exists
        const index = postModal.postsDb.findIndex(p=>p.postId == postId);
        if(index == -1){
            throw new AppError(401,"Post not found");
        }

        //Check if that post belongs to user
        const userPosts = user.posts;
        const indexU = userPosts.findIndex(p=>p == postId);

        //throw error for not 
        if(indexU == -1){
            throw new AppError(401,"Post does not belong to user");
        }

        //delete post from userdata and all posts
        userPosts.splice(indexU,1);

        //delete media related to post
        const postImage = postModal.postsDb[index].image;

        if(postImage){
            const oldPath = path.join(path.resolve(),"public",postImage);
            fs.unlink(oldPath,(err)=>{
                if(err){
                    console.log("Error ",err);
                }
            })
        }

        postModal.postsDb.splice(index,1);
        
    }

    //Returns all post
    static getAll(){
        return postModal.postsDb;
    }

    static getbyid(postId){
        return postModal.getAll().find(p=>p.postId == postId);
    }

    //Like a post //postId is liked by userId 
    static likePost(userId,postId){
        //verify if user is valid 
        const user = userModal.userbyId(userId);
        if(!user) throw new AppError(401,"User not found!");

        //check if post exists or not 
        const post = postModal.getbyid(postId);

        if(!post) throw new AppError(401,"Post not found!");

        //check for already liked post
        const postIndex = user.likedPosts.findIndex(p=>p == postId);

        //Do nothing if post is liked once by user
        if(postIndex != -1){
            return;
        }

        user.likedPosts.push(postId);
        post.likesCount++;
    }

    //comment on a post userId posted a comment message on postId
    static comment(userId,postId,Message){
        //verify if user is valid 
        const user = userModal.userbyId(userId);
        if(!user) throw new AppError(401,"User not found!");

        //check if post exists or not 
        const post = postModal.getbyid(postId);
        if(!post) throw new AppError(401,"Post not found!");

        const comment =
            {"user":userId,"message":Message}
        
        post.comments.push(comment);
    }

    static dislikePost(postId,userId){
        //verify if user is valid 
        const user = userModal.userbyId(userId);
        if(!user) throw new AppError(401,"User not found!");

        //check if post exists or not 
        const post = postModal.getbyid(postId);
        if(!post) throw new AppError(401,"Post not found!");

        const index = user.likedPosts.findIndex(p=>p == postId);

        if(index != -1){
            post.likesCount--;
            user.likedPosts.splice(index,1);
        }
    }

}