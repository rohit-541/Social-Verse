import AppError from "../Error/Error.js"
import { logger } from "./winstonlogger.js";

export const errorLogger = (error,req,res,next)=>{
    if(error instanceof AppError){  //Client Error
        return res.status(error.statusCode).send(error.message);
    }

    //server errors

    const message = `TimeStamp: ${Date().toString()} , Error: ${error} reqUrl: ${req.url}`;

    logger.log('error',message);
    res.status(500).send("Internal Server Error. Please check later!");
}