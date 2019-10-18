import express from 'express';
const router = express.Router();

import { createSubscription } from '../services/subscriptionService';

router.post('/', async (request, response) => {
    const dataSubscription = {
        idVacancy: request.body.idVacancy,
        idCandidate: request.body.idCandidate
    };
  
    try {
        await createSubscription(dataSubscription);
        response.status(201).send('Inscrição feita com sucesso!');
    } catch (error) {
        response.status(400).send({ Error: error });
    }
});

module.exports = (api) => api.use('/api/admin/subs', router);