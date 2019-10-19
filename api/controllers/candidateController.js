import express from 'express';
const router = express.Router();

import { createCandidate, getCandidateById, getAllCandidates } from '../services/candidateService';
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
        response.status(201).json('Candidato cadastrado com sucesso!');
    } catch (error) {
        response.status(400).json({ Error: 'Erro ao cadastrar.' });
    }
});


router.get('/:id', verifyJWT, async (request, response) => {
    const idCandidate = request.params.id;

    const idMatched = await getCandidateById(idCandidate);

    if (idMatched)
        response.status(200).json(idMatched)
    else
        response.status(404).json({ error: 'Candidato não existe.' });
});


router.get('/', verifyJWT, async (request, response) => {
    const candidates = await getAllCandidates();

    if (candidates.length !== 0)
        response.status(200).json({ candidates });
    else
        response.status(400).json({ error: 'Não foi possivel retornar adminstradores.' });
});


module.exports = api => api.use('/api/admin/candidato', router)
