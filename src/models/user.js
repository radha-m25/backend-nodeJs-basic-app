const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First name must be at least 3 characters long'],
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
    },
    password: {
        type: String,
        required: true,
        index: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Password needs to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter')
            }
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        validate(value){
            if(!['male','female'].includes(value)){
                throw new Error('Invalid gender')
            }
        }
    },
    phoneNum: {
        type: String,
        required: true,
        validate(value){
            if(value.length !== 10 || !/^\d+$/.test(value)){
                throw new Error('Phone number must be 10 digits numbers');
            }
        }
    }

},{timestamps: true});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id},'practiceKey',{expiresIn: '1d'});
    return token;
}

const MyModel = mongoose.model('User', userSchema);

module.exports = MyModel;