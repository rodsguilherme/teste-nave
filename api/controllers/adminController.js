import express from 'express';
const router = express.Router();

import { createAdmin, login } from '../services/adminService';


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
        response.status(400).send({ Error: error });
    }

});

router.post('/login', async (request, response) => {
    const dataAdmin = {
        email: request.body.email,
        password: request.body.password
    };

   
    try {
        await login(dataAdmin);
        response.status(200).send('Conectado com sucesso');

    } catch (error) {
        console.log(error)
        response.status(400).send({ Error: error });
    }

});

module.exports = (api) => api.use('/api/admin', router); 