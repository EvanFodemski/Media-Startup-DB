const { Schema, model, Types } = require ('mongoose');

var validateEmail = function(email) {
    var ret = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return ret.test(email)
};

const UsersSchema = new Schema(
    {
    username: {
        type: String,
        unique:true,
        required:true,
        trim: true
    },
    email: {
        type:String,
        required:'Email is Required',
        unique:true,
        validate: [validateEmail, 'Enter a Valid email'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a Valid email']
    },
    thoughts: {}

    }
)