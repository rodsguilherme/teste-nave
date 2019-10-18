import express from 'express';
const router = express.Router();

import { createAdmin, loginAdmin, getAdminId } from '../services/adminService';
import { tokenGenerator } from '../services/authService';


router.post('/', async (request, response) => {
    const dataAdmin = {
        name: request.body.name,
        password: request.body.password,
        email: request.body.email
    };

    try {
        await createAdmin(dataAdmin);
        response.status(201).send('Administrador criado com sucesso!');

    } catch (error) {
        response.status(400).send({ Error: 'Não foi possivel cadastrar.' });
    }

});

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

module.exports = api => api.use('/api/admin', router); 