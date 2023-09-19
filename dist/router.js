'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.router = void 0;
const express_1 = require('express');
const usersControllers_1 = require('./controllers/usersControllers');
exports.router = (0, express_1.Router)();
exports.router.post('/user/register', usersControllers_1.registerUser);
exports.router.post('/user/login', usersControllers_1.loginUser);
