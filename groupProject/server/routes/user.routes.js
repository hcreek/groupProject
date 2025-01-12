import Router from 'express';
import {register,login,logout, editOneUser} from '../controllers/user.controller.js';

const userRouter=Router()

userRouter.route('/register')
    .post(register)

userRouter.route('/login')
    .post(login)

userRouter.route('/logout')
    .post(logout)

userRouter.route('/:id')
    .put((req, res)=>editOneUser(req, res))

export default userRouter;