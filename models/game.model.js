const {Schema,model} = require('mongoose');

const TeamSchema = Schema({

    date:{
        type: Date,
        required:true
    },
    local:{
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required : true
    },
    visitant:{
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required : true
    }
});

module.exports = model('Game',TeamSchema);