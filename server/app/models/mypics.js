var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;



var picsschema = new Schema({
    galleryId: { type: Schema.Types.ObjectId, required:true },
    pics: { type: String, required:true},
    description:{type:String},
    dateCreated: {type: Date, default:Date.now},
    uploadDate :{ type:Date, default:Date.now},
    completed: { type: Boolean, default: false },
    file: {filename:String, originalName:String,dateUploaded:Date}
});

module.exports = 
Mongoose.model('Mypics', picsschema)