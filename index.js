//Import pkg modules
import express from 'express'
import bodyParser from 'body-parser';

//import user module here
import { invalidRoute } from './src/Middlewares/invalidroutes.js';
import { router as userRouter } from './src/user/routes/user.rourte.js';
import {router as postRouter} from './src/post/routes/postroutes.js'

//Create Server
const app = express();

//server configurations
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('/user',userRouter);
app.use('/post',postRouter);

app.get('/',(req,res)=>{
    res.status(404).send("Welcome to social verse apis");
});

//Any unhandled routes
app.use(invalidRoute);

export default app;