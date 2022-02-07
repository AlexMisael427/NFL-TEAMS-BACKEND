const {Schema,model} = require('mongoose');

const TeamSchema = Schema({

    name:{
        type: String,
        required:true
    },
    state:{
        type: String,
        required:true
    },
    year:{
        type: Date,
        required:true
    },
    trophies:{
        type: Number,
    },
    videoUrl:{
        type: String,
    },
    url:{
        type: String,
        required:true
    },
});

module.exports = model('Team',TeamSchema);