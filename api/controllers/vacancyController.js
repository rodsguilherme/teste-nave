import express from 'express';
const router = express.Router();

import { createVacancy, getVacancyById, getAllVacancys } from '../services/vacancyService';
import { verifyJWT } from '../services/authService';

router.post('/', verifyJWT, async (request, response) => {
    const dataVacancy = {
        name: request.body.name,
        skill: request.body.skill,
        description: request.body.description
    }
    try {
        await createVacancy(dataVacancy);
        response.status(201).json('Vaga cadastrada com sucesso!');
    } catch (error) {
        response.status(400).json({ error: 'Erro ao cadastrar a vaga.' });
    }
});

router.get('/:id', verifyJWT, async (request, response) => {
    const idVacancy = request.params.id;

    const idChecked = await getVacancyById(idVacancy);

    if (idChecked)
        response.status(200).json(idChecked);
    else
        response.status(404).json({ error: 'Vaga não cadastrada.' });
});

router.get('/', verifyJWT, async (request, response) => {
    const vacancys = getAllVacancys();

    if (vacancys.length !== 0)
        response.status(200).json({ vacancys });
    else
        response.status(400).json({ error: 'Não foi possivel retorna as vagas.' });
});

module.exports = api => api.use('/api/admin/vagas', router)