import path from 'path'

import {postModal} from '../model/postModel.js'

export class postController{
    //Method to handel post creation
    static createPost = (req,res)=>{
        
        //Get data from req
        const userId = req.userId;
        const {title,content} = req.body;
        let ImageUrl = null;
        if(req.file){
            ImageUrl = path.join('uploads','postImage',req.file.filename);
        }

        try{
            postModal.createPost(userId,title,content,ImageUrl);
            res.status(200).send("Post Created successfully");
        }catch(error){
            res.status(error.statusCode).send(error.message);
        }

       
    }

    //Method to remove a post
    static removePost = (req,res)=>{
        const userId = req.userId;
        const postId = req.params.id;

        try{
            postModal.removePost(postId,userId);
            res.status(200).send("Post removed Successfully");
        }catch(err){
            res.status(err.statusCode).send(err.message);
        }
    }

    //Method to like a post
    static likePost = (req,res)=>{
        const userId = req.userId;
        const postId = req.params.id;
        try{
            postModal.likePost(userId,postId);
            res.status(200).send("Liked the post successfully");
        }catch(err){
            res.status(err.statusCode).send(err.message);
        }
    }

    //dislike a post
    static dislikePost = (req,res)=>{
        const userId = req.userId;
        const postId = req.params.id;

        try{
            postModal.dislikePost(postId,userId);
            res.status(200).send("Post Disliked successfully");
        }catch(err){
            throw new AppError(err.statusCode,err.message);
        }
    }

    //method to comment on post
    static commentPost = (req,res)=>{
        const userId = req.userId;
        const postId = req.params.id;
        const {comment} = req.body;
        try{
            postModal.comment(userId,postId,comment);
            res.status(200).send("Commented Successfully");
        }catch(err){
            res.status(err.statusCode).send(err.message);
        }
    }

    //get posts posted by a user
    static postByUser = (req,res)=>{
        const userId = req.userId;
        try{
            const posts = postModal.userPost(userId);
            res.status(200).send(posts);
        }catch(err){
            res.status(err.statusCode).send(err.message)
        }
    }

    //returns all post
    static getAllPost = (req,res)=>{
        const posts = postModal.getAll();
        res.status(200).send(posts);
    }


}