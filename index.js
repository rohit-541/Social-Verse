//Import pkg modules
import express from 'express'

//import user module here
import { invalidRoute } from './src/Middlewares/invalidroutes.js';
import { router as userRouter } from './src/user/routes/user.rourte.js';

//Create Server
const app = express();

//server configurations
app.use(express.json());

//routes
app.use('/user',userRouter);
app.get('/',(req,res)=>{
    res.status(404).send("Welcome to social verse apis");
});

//Any unhandled routes
app.use(invalidRoute);

export default app;