const express = require('express');
const router = express.Router();

import { createAdmin } from '../services/servicesAdmin';
import { verifyAdmin } from '../services/servicesAdmin';



router.post('/', async (request, response) => {
    const dataAdmin = {
        name: request.body.name,
        password: request.body.password
    };

    try {
        await createAdmin(dataAdmin);
        response.status(201).send('Administrador criado com sucesso!');

    } catch (error) {
        response.status(400).send('Não possivel cadastrar, verifique os campos.');
    }

});

router.post('/login', async (request, response) => {
    const dataAdmin = {
        name: request.body.name,
        password: request.body.password
    };

    try {
        await verifyAdmin(dataAdmin);
        response.status(200).send('Conectado com sucesso!');

    } catch (error) {
        response.status(400).send({ Error });
    }
});

module.exports = (api) => api.use('/api/admin', router); 