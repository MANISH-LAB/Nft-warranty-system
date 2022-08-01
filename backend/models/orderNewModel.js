const mongoose = require('mongoose');

const orderNewSchema = new mongoose.Schema({
    buyer_metawallet: {
        type: String,
        required: true,
    },
    cuttedPrice:{
        type:Number,
        required:true
    },
    image:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true

    },
    product:{
        type: String,
        required: true,
    },
    quantity:{
        type:Number,
        required:true

    },
    seller:{
        type: String,
        required: true,
    },
    stock:{
        type:Number,
        required:true
    },
    warranty:{
        type:Number,
        required:true
    }
 
});

module.exports = mongoose.model("newOrder", orderNewSchema);