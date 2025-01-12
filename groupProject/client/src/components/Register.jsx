import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import style from '../css/Register.model.css';
import axios from 'axios';
import {userContext} from '../context/userContext';

export const Register =()=>{
    const {user,setUser}=useContext(userContext);
    const navigate=useNavigate()
    const [userData,setUserData]=useState({
        fName:'',
        lName:'',
        userName:'',
        email:'',
        password:'',
        condfirmPassword:''
    })

    const [userErrors, setUserErrors]=useState({})

    const updateUserData=e=>{
        const {name,value}=e.target
        setUserData(prev=>({...prev,[name]:value}))
    }

    const submitHandler= e=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/register', userData, {withCredentials:true})
            .then((res)=>{
                setUser(res.data);
                navigate('/home');
            })
            .catch((error)=>{
                console.log(error.response.data);
                setUserErrors(error.response.data);
            })
    }


    return(
        <div>
            <h1>Create User</h1>
            {userErrors && <p>{userErrors.name}{userErrors.statusCode}</p>}
            <form onSubmit={submitHandler}>
                <div className={style.input}>
                    <label>First Name:</label>
                    {userErrors.validationErrors && <p>{userErrors.validationErrors.fName}</p>}
                    <input type="text" name="fName" value={userData.fName} onInput={updateUserData}/>
                </div>
                <div className={style.input}>
                    <label>Last Name:</label>
                    {userErrors.validationErrors && <p>{userErrors.validationErrors.lName}</p>}
                    <input type="text" name="lName" value={userData.lName} onInput={updateUserData}/>
                </div>
                <div className={style.input}>
                    <label>Username:</label>
                    {userErrors.validationErrors && <p>{userErrors.validationErrors.userName}</p>}
                    <input type="text" name="userName" value={userData.userName} onInput={updateUserData}/>
                </div>
                <div className={style.input}>
                    <label>Email:</label>
                    {userErrors.validationErrors && <p>{userErrors.validationErrors.email}</p>}
                    <input type="email" name="email" value={userData.email} onInput={updateUserData}/>
                </div>
                <div className={style.input}>
                    <label>Password:</label>
                    {userErrors.validationErrors && <p>{userErrors.validationErrors.password}</p>}
                    <input type="password" name="password" value={userData.password} onInput={updateUserData}/>
                </div>
                <div className={style.input}>
                    <label>Confirm Password:</label>
                    {userErrors.validationErrors && <p>{userErrors.validationErrors.confirmPassword}</p>}
                    <input type="password" name="confirmPassword" value={userData.confirmPassword} onInput={updateUserData}/>
                </div>

                <input type="submit" value="Create"/>
            </form>
        </div>
    )
}

// export default Register;