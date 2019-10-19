import express from 'express';
const router = express.Router();

import { tokenGenerator } from '../services/authService';
import {  getAdminIdByEmail} from '../services/adminService';
import { loginAdmin } from '../services/adminService';

router.post('/login', async (request, response) => {
    const dataAdmin = {
        email: request.body.email,
        password: request.body.password
    };

   
    const connected = await loginAdmin(dataAdmin);
   
    if (connected) {
        const adminId = await getAdminIdByEmail(dataAdmin.email);
        const token = tokenGenerator(adminId);
        response.status(200).json({ token });
    }
    else{
        response.status(401).json({ err: 'Erro ao conectar!' });
    }
    });

module.exports = api => api.use('/api/', router); 