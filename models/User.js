const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    fname : {
        type: String,
        required : true
    },
    lname : {
        type:String,
        required :true
    },
    email :{
        type : String,
        required : true,
        
    },
    password : {
        type : String,
        required : true,
        
    },
    tel : {
        type : String,
        required : true,
        
    },
    address : {
        type : String,
        required : true,
       
    },
    created_at:{
        type:Date,
        default :Date.now
    },
    avatar : {
        type:String,
        default:"User_icon.png",
       
    }
    })

module.exports=mongoose.model("user",userSchema)