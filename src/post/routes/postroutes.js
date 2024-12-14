import express from 'express'
import {postController} from '../controller/postcontroller.js'
import {auth} from '../../Middlewares/Authorization.js'
import { uploadPost } from '../../Middlewares/FileUploadUser.js';

export const router = express.Router();

router.get('/',postController.getAllPost);
router.get('/userPost',auth,postController.postByUser);

//post requests
router.post('/new',auth,uploadPost.single('image'),postController.createPost);
router.post('/like/:id',auth,postController.likePost);
router.post('/dislike/:id',auth,postController.dislikePost);
router.post('/comment/:id',auth,postController.commentPost);

//delete requests
router.delete('/:id',auth,postController.removePost);

