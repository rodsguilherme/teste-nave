import express from 'express';
const router = express.Router();

import { createVacancy } from '../services/vacancyService';

router.post('/', async (request, response) => {
    const dataVacancy = {
        name: request.body.name,
        skill: request.body.skill,
        description: request.body.description
    }
    try {
        await createVacancy(dataVacancy);
        response.status(201).send('Vaga cadastrada com sucesso!');

    } catch (error) {
        console.log(error)
        response.status(400).send('Não foi possivel cadastrar, verifique os campos.');
    }
});

module.exports = (api) => api.use('/api/admin/vagas', router)