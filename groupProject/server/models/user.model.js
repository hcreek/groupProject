import {model,Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        fName: {
            type: String,
            required: [true, "First name is required"]
        },
        lName: {
            type: String,
            required: [true, "Last name is required"]
        },
        userName:{
            type:String,
            required:[true, "Username is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        }
    }, 
    {timestamps: true}
);

UserSchema.virtual('confirmPassword')
    .get( function(){
        return this._confirmPassword
    })
    .set(function(value){
        this._confirmPassword= value
    })

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = model("User", UserSchema);

export default User;