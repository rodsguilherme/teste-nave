import express from 'express';
const router = express.Router();

import { tokenGenerator } from '../services/authService';
import { getAdminId } from '../services/adminService';
import { loginAdmin } from '../services/adminService';

router.post('/login', async (request, response) => {
    const dataAdmin = {
        email: request.body.email,
        password: request.body.password
    };


    const connected = await loginAdmin(dataAdmin);

    if (connected) {
        const adminId = await getAdminId(dataAdmin.email);
        const token = tokenGenerator(adminId);
        response.status(200).send({ token });
    }
    else
        response.status(401).send();
});

module.exports = (api) => api.use('/api/login', router); 