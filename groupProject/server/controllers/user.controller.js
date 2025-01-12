import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const register= async (req, res) => {
    try{
        const potentialUser= await User.findOne({email:req.body.email})
        if(potentialUser){
            res.status(400).json({message:'This email already exists, please log in'})
        }
        else{
            const newUser= await User.create(req.body);
            const payload = {
                id: newUser._id,
                email:newUser.email,
                userName:newUser.userName
            };
            const mySecret= process.env.SECRET_KEY;
            const userToken = jwt.sign(payload, mySecret, {expiresIn:'2h'});
            res.status(201).cookie('userToken',userToken,{httpOnly:true, maxAge:7200}).json(newUser);
        }
    }
        catch(err){
            console.log(err);
            res.status(400).json({error: err})
        }
}

const login= async(req, res) => {
    try{
        const user = await User.findOne({ userName: req.body.userName });
        if(user === null) {
            // email not found in users collection
            console.log("*****************")
            return res.status(400).json({message:"User not found. Click the link to Sign Up!"})
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if(!correctPassword) {
            console.log("????????????")
            return res.status(400).json({message:"Invalid credentials, please try again"})
        }
        const userToken = jwt.sign(
            {id: user._id
            }, process.env.SECRET_KEY);
            res.cookie("usertoken", userToken, {httpOnly:true, maxAge:7200})
            res.status(201).json(user);

        } catch (err){
            console.log(err);
            res.status(500).json(err)
        }
}

const logout=async(req,res)=>{
    res.clearCookie('userToken')
    res.status(200).json({message:'Successfully logged out!'})
}

const getLoggedInUser= async (req,res)=>{
    try{
        const{id}=req.params
        console.log(id);
        console.log(req.params);
        const user=await User.findById(id)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const editOneUser=async(req, res, next)=>{
    console.log('$$$$$$$$$$', req.params)
    const options={
        new:true,
        runValidators: true
    };
    try{
        const editOne=await User.findByIdAndUpdate(req.params.id,req.body);
        res.json(editOne);
    } catch (error){
        console.log(error);
    }
}

export {
    register,
    login,
    logout,
    getLoggedInUser,
    editOneUser
};

