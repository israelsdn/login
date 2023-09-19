'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = require('../models/user');
const bcrypt_1 = __importDefault(require('bcrypt'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
require('dotenv').config();
const registerUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = req.body;
      //Validação dos dados
      if (!user.name || !user.email || !user.password || !user.confPassword) {
        return res.status(422).json({ msg: 'Dados insuficientes' });
      }
      if (user.confPassword != user.password) {
        return res.status(400).json({ msg: 'As senhas não coincidem' });
      }
      const userVerify = yield (0, user_1.getUser)(user.email);
      if (userVerify) {
        return res
          .status(409)
          .json({ msg: `O email: ${user.email} já está sendo utilizado` });
      }
      //Criptografando a senha
      const salt = yield bcrypt_1.default.genSalt(10);
      const senha_hash = yield bcrypt_1.default.hash(user.password, salt);
      //Inserindo dados no banco de dados
      (0, user_1.createUser)(user.name, user.email, senha_hash);
      return res
        .status(201)
        .json({ msg: `Usuario ${user.name} criado com sucesso` });
    } catch (error) {
      return res.status(500).json({ msg: 'algo inesperado aconteceu' });
    }
  });
exports.registerUser = registerUser;
const loginUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { email, password } = req.body;
      //Validação de dados
      if (!email || !password) {
        return res.status(422).json();
      }
      const user = yield (0, user_1.getUser)(email);
      if (!user) {
        return res.status(401).json();
      }
      //Verificando senha
      const passwordVerify = yield bcrypt_1.default.compare(
        password,
        user.senha_hash,
      );
      if (!passwordVerify) {
        return res.status(401).json();
      }
      // Gerando token
      const secret = process.env.SECRET;
      const token = jsonwebtoken_1.default.sign(
        {
          id: user.id,
        },
        secret,
      );
      return res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json('algo inesperado aconteceu');
    }
  });
exports.loginUser = loginUser;
