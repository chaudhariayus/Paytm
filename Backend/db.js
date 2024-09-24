
const express=require("express");


const mongo=require("mongoose");

mongo.connect("mongodb+srv://Paytm")


const User=mongo.model('User',{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


const Account=mongo.model('Account',{
    userid:{
        type:mongo.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    balance:{
        type:Number,
        required:true
    }
})

module.exports={
    User,
    Account
}


