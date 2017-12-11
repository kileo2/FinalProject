var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;



var galleryschema = new Schema({
    userId: { type: Schema.Types.ObjectId, required:true },
    gallery:{type:String},
    description:{type:String},
    dateChanged: {type: Date, default:Date.now},
});

module.exports = 
Mongoose.model('Gallery', galleryschema)