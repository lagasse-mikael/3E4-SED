import mongoose from 'mongoose';

const planetSchema = mongoose.Schema({
    name:{type:String, unique:true, required:true},
    discoveredBy:{type:String, index:true, required:true},
    discoveryDate: Date,
    temperature:{type:Number, required:true},
    sattelites : [String],
    position : {
        x:{type:Number, min:-1000, max:1000, required:true},
        y:{type:Number, min:-1000, max:1000, required:true},
        z:{type:Number, min:-1000, max:1000, required:true}
    }
},{
    colletion:'planets',
    strict:'throw'
});

export default mongoose.model('Planet',planetSchema);