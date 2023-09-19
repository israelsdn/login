'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.router = void 0;
const express_1 = require('express');
const usersControllers_1 = require('./controllers/usersControllers');
exports.router = (0, express_1.Router)();
exports.router.get('/', usersControllers_1.users);
//router.post('/user/register', registerUser);
//router.post('/user/login', loginUser);
