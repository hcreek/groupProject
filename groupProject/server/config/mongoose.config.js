import {connect} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI= process.env.MONGODB_URI;

async function dbConnect() {
    try{
        await connect(MONGODB_URI,{
            dbName: 'webChat',
        });
        console.log("Pinged your deployment. You successfully connect to MongoDB webChat!");
    } catch (error){
        console.log(error);
        throw error;
    }
}

export default dbConnect;