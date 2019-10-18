import express from 'express';
const router = express.Router();

import { createSubscription } from '../services/subscriptionService';
import { verifyJWT } from '../services/authService';


router.post('/', verifyJWT, async (request, response) => {
    const dataSubscription = {
        idVacancy: request.body.idVacancy,
        idCandidate: request.body.idCandidate,
        idAdmin: request.userId
    };

    try {
        await createSubscription(dataSubscription);
        response.status(201).send('Inscrição feita com sucesso!');
    } catch (error) {
        response.status(400).send({ Error: 'Erro ao efetuar a inscrição.' });
    }
});

module.exports = (api) => api.use('/api/admin/subs', router);