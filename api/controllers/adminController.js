import express from 'express';
const router = express.Router();

import { createAdmin, getAdminById, getAllAdmins } from '../services/adminService';
import { verifyJWT } from '../services/authService';


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


router.get('/:id', verifyJWT, async (request, response) => {
    const idAdmin = request.params.id;

    const adminMatched = await getAdminById(idAdmin);
    if (adminMatched !== undefined)
        response.status(200).send(adminMatched);
    else
        response.status(404).send({ error: 'Administrador não cadastrado' });
});

router.get('/', verifyJWT, async (request, response) => {
    const admins = await getAllAdmins();

    if (admins.length !== 0)
        response.status(200).send({ admins });
    else
        response.status(400).send({ error: 'Não foi possivel retornar adminstradores.' });
});


module.exports = api => api.use('/api/admin', router); 