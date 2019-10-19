import express from 'express';
const router = express.Router();

import { createVacancy, getVacancyById } from '../services/vacancyService';
import { verifyJWT } from '../services/authService';

router.post('/', verifyJWT, async (request, response) => {
    const dataVacancy = {
        name: request.body.name,
        skill: request.body.skill,
        description: request.body.description
    }
    try {
        await createVacancy(dataVacancy);
        response.status(201).send('Vaga cadastrada com sucesso!');
    } catch (error) {
        response.status(400).send({ error: 'Erro ao cadastrar a vaga.' });
    }
});

router.get('/:id', verifyJWT, async (request, response) => {
    const idVacancy = request.params.id;

    const idChecked = await getVacancyById(idVacancy);

    if (idChecked)
        response.status(200).send(idChecked);
    else
        response.status(404).send({ error: 'Vaga não cadastrada.' });
});

module.exports = api => api.use('/api/admin/vagas', router)