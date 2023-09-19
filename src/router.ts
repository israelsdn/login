import { Router } from 'express';
import { loginUser, registerUser, users } from './controllers/usersControllers';

export const router = Router();

router.get('/', users);
//router.post('/user/register', registerUser);
//router.post('/user/login', loginUser);
