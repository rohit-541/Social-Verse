import multer from 'multer'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,'public/uploads/userProfile');
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now() + '_' + file.originalname;
        cb(null,fileName);
    }
});

export const uploadUser  = multer({storage:storage});