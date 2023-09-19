import { Router } from 'express';
import { loginUser, registerUser } from './controllers/usersControllers';

export const router = Router();

router.get('/', (req, res) => res.send('Aqui não tem nada'));
//router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
