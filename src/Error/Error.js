export default class AppError extends Error{
    constructor(code,msg){
        super(msg);
        this.statusCode = code;
    }
}