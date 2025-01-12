import {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
// import style from '../css/Form.module.css';
import axios from 'axios';
import {userContext} from '../context/userContext';

export const Login=(props)=>{
    const{user,setUser}=useContext(userContext);
    const navigate=useNavigate()
    const [userData,setUserData]=useState({
        userName:'',
        password:''
    })

    const [userErrors, setUserErrors]=useState({})

    const updateUserData=e=>{
        const {name,value}=e.target
        setUserData(prev=>({...prev,[name]:value}))
    }

    const submitHandler= e=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/login', userData, {withCredentials:true})
            .then((res)=>{
                setUser(res.data);
                setUserData(res.data);
                navigate('/home')
            })
            .catch((err)=> {
                console.log("``````````");
                console.log(err.response.data);
                setUserErrors(err.response.data)
            })
    }

    return(
        <div>
            <h1>Websockets Chat</h1>
            <div>
                <p>{userErrors.message}</p>
                <form onSubmit={submitHandler}>
                    <div >
                        <label>Username:</label>
                        <input type="text" name="userName" value={userData.userName} onInput={updateUserData}/>
                    </div>
                    <div >
                        <label>Password:</label>
                        <input type="password" name="password" value={userData.password} onInput={updateUserData}/>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
            </div>
            
            <button><a href="/register">Sign Up</a></button>
        </div>
    )
}

// export default Login;