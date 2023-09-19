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
Object.defineProperty(exports, '__esModule', { value: true });
exports.getUser = exports.createUser = void 0;
const client_1 = require('@prisma/client');
const prisma = new client_1.PrismaClient();
// Função para criar um novo usuário
function createUser(name, email, senha_hash) {
  return __awaiter(this, void 0, void 0, function* () {
    yield prisma.users.create({
      data: {
        name,
        email,
        senha_hash,
      },
    });
  });
}
exports.createUser = createUser;
// Função para buscar um usuario
function getUser(email) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = yield prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  });
}
exports.getUser = getUser;
