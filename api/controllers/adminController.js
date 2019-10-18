import express from 'express';
const router = express.Router();

import { createAdmin } from '../services/adminService';



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


module.exports = api => api.use('/api/admin', router); 