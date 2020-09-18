const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    Role:{
        type:String,
        default:"participant"
    },
    name : {
        type: String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tel : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    created_at:{
        type:Date,
        default :Date.now
    }
})

module.exports=mongoose.model("user",userSchema)