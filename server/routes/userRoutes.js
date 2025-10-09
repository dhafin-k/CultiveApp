import express from 'express';
import { createUser, deleteUser, getAllUsers, updateUser, userLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/create', createUser);
userRouter.get('/all', getAllUsers);
userRouter.delete('/delete/:id', deleteUser);
userRouter.put('/update/:id', updateUser)


export default userRouter;