export class userModal{
    //Constructor of class
    constructor(name,email,password,ImageUrl){
        this.userId = userModal.generateId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.ImageUrl = ImageUrl;
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
        const user = this.usersDb.find(p=>p.id == userId);
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
    static updateUser(userID,name,password,Imageurl){
        const user = this.usersdb.find(p=>p.id == userID);
        if(user){
            if(name){
                user.name == name;
            }
            if(password){
                user.password == password;
            }

            if(Imageurl){
                user.Imageurl == Imageurl;
            }
        }
        return user;
    }
}

//Testing code
userModal.registerUser("Rohit","rohit@gmail.com","123","url");
userModal.usersDb[0].userId = "541";
