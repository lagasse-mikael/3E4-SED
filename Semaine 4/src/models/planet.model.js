import mongoose from 'mongoose';

const planetSchema = mongoose.Schema({
    name:{type:String, unique:true, required:true}
});