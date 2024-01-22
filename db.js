const express= require('express');
const dotenv= require('dotenv').config();
const mongoose = require('mongoose');


async function connectDB(){
    try {
        await mongoose.connect(`${process.env.DBURL}`);
        console.log("DB Connected");
    } catch (error) {
        console.log('db not connected error');
    }
}


module.exports = connectDB;
