const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const blogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim : true
        
    },
    content: {
        type: String,
        required: true,
        trim : true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: "author"  //ObjectId here i take reference of author collection (linkings two document)
    },
    
    category: {
        type: String,
        required: true,
        trim : true
    },
    
    deletedAt: {type: Date},
    isDeleted: {
        type: Boolean,
        default: false
    },
    

}, { timestamps: true });


module.exports = mongoose.model("blog", blogsSchema)