//Import pkg modules
import express from 'express'
import bodyParser from 'body-parser';

//import user module here
import { invalidRoute } from './src/Middlewares/invalidroutes.js';
import { router as userRouter } from './src/user/routes/user.rourte.js';
import {router as postRouter} from './src/post/routes/postroutes.js'
import {errorLogger} from './src/Middlewares/ErrorHandler.js'
import swagger from 'swagger-ui-express'

import apiDocs from '../Social-Verse/apiDocs.json' assert {type:'json'};
//Create Server
const app = express();

app.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

//server configurations
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/user',userRouter);
app.use('/post',postRouter);

app.get('/',(req,res)=>{
    res.status(404).send("Welcome to social verse apis");
});

app.use(errorLogger);
//Any unhandled routes
app.use(invalidRoute);

export default app;