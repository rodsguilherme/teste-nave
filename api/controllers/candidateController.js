import express from 'express';
const router = express.Router();

import { createCandidate, getCandidateById } from '../services/candidateService';
import { verifyJWT } from '../services/authService';

router.post('/', verifyJWT, async (request, response) => {
    const dataCandidate = {
        name: request.body.name,
        email: request.body.email,
        telephone: request.body.telephone,
        cpf: request.body.cpf
    };

    try {
        await createCandidate(dataCandidate);
        response.status(201).send('Candidato cadastrado com sucesso!');
    } catch (error) {
        response.status(400).send({ Error: 'Erro ao cadastrar.' });
    }
});


router.get('/:id', verifyJWT, async (request, response) => {
    const idCandidate = request.params.id;

    const idMatched = await getCandidateById(idCandidate);

    if (idMatched)
        response.status(200).send(idMatched)
    else
        response.status(404).send({ error: 'Candidato não existe.' });
});

module.exports = api => api.use('/api/admin/candidato', router)
