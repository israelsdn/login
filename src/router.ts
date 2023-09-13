import { Router } from 'express';
import { registerUser } from './controllers/usersControllers';

export const router = Router();

router.post('/user/register', registerUser);
