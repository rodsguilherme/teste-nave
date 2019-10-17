import express from 'express';
const router = express.Router();

import { createAdmin } from '../services/adminService';
import { verifyAdmin } from '../services/adminService';
import {tokenGenerator} from '../services/authService';



router.post('/', async (request, response) => {
    const dataAdmin = {
        name: request.body.name,
        password: request.body.password,
        token: tokenGenerator(id)
    };

    try {
        await createAdmin(dataAdmin);
        response.status(201).send('Administrador criado com sucesso!');

    } catch (error) {
        response.status(400).send({ Error: error });
    }

});

router.post('/login', async (request, response) => {
    const dataAdmin = {
        name: request.body.name,
        password: request.body.password
    };

    try {
        await verifyAdmin(dataAdmin);
        response.status(200).send('Conectado com sucesso', );

    } catch (error) {
        response.status(400).send('Usuário ou senha incorretas, tente novamente.');
}

});

module.exports = (api) => api.use('/api/admin', router); 