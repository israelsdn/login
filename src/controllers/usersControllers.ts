import { IUser, createUser, getUser } from '../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;

    //Validação dos dados
    if (!user.name || !user.email || !user.password) {
      return res.status(422).json({ msg: 'Dados insuficientes' });
    }

    const userVerify = await getUser(user.email);

    if (userVerify) {
      return res
        .status(409)
        .json({ msg: `O email: ${user.email} já está sendo utilizado` });
    }

    //Criptografando a senha
    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(user.password, salt);

    //Inserindo dados no banco de dados
    createUser(user.name, user.email, senha_hash);

    return res
      .status(201)
      .json({ msg: `Usuario ${user.name} criado com sucesso` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'algo inesperado aconteceu' });
  }
};
