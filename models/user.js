const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt =require("bcrypt");

const userSchema=new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
       
    },
    age: {
        type: Number,
        default: 0,
    },
    phone_No:{
        type: String,
        required:true
    },
},{
    timestamps:true
});

userSchema.pre("save",function(next){
    if(this.isModified('password')){
       bcrypt.hash(this.password,8,(err,hash)=>{
        if(err) return next(err);
        this.password=hash;
        next();
       })
    }
})

userSchema.methods.comparePassword=async function (password){
    if(!password) throw new Error();
    
    try {
      const result=await bcrypt.compare(password,this.password);
      return result;
    } catch (error) {
      console.log("error while comparing password!",error.message);  
    }
}

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.methods.generateAuthToken= async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},"Iver33",{expiresIn:"1 day"});
    return token;
}

const user = mongoose.model('user',userSchema);

module.exports = user
