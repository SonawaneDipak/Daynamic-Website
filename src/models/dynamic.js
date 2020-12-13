const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        required:true
    },

    message:{
        type:String,
        required:true,
        minLength:3
    },
})

// we need a collection

const User =mongoose.model("data",userSchema);

module.exports=User;