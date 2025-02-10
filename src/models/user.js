const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNum: {
        type: String,
    }

})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id},'practiceKey',{expiresIn: '1d'});
    return token;
}

const MyModel = mongoose.model('User', userSchema);

module.exports = MyModel;