import axios from "axios";

const USER_INSTANCE= axios.create({
    baseURL:'http://localhost:8000/api/user'
})

const createUser = async userData=>{
    try{
        const res = await USER_INSTANCE.post('/',userData)
        return(res.data);
    } catch(error){throw error}
}

const getAllUsers= async ()=>{
    try{
        const res= await USER_INSTANCE.get('/')
        return(res.data);
    } catch(error){throw error}
}

const getOneUser= async id =>{
    try{
        const res= await USER_INSTANCE.get(`/${id}`)
        return(res.data)
    } catch(error){throw error}
}

const editOneUser= async userData=>{
    try{
        const res=await USER_INSTANCE.put(`/${userData._id}`,userData)
        return(res.data)
    } catch(error){throw error}
}

const deleteOneUser=async id=>{
    try{
        const res=await USER_INSTANCE.delete(`/${id}`)
        return(res.data)
    } catch(error){throw error}
}


export {
    createUser,
    getAllUsers,
    getOneUser,
    editOneUser,
    deleteOneUser
}