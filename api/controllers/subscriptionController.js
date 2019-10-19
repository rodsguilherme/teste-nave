import express from 'express';
const router = express.Router();

import { createSubscription, getSubscriptionById } from '../services/subscriptionService';
import { verifyJWT } from '../services/authService';


router.post('/', verifyJWT, async (request, response) => {
    const dataSubscription = {
        idVacancy: request.body.idVacancy,
        idCandidate: request.body.idCandidate,
        idAdmin: request.userId
    };

    try {
        await createSubscription(dataSubscription);
        response.status(201).json('Inscrição feita com sucesso!');
    } catch (error) {
        response.status(400).json({ Error: 'Erro ao efetuar a inscrição.' });
    }
});

router.get('/:id', verifyJWT, async (request, response) => {
    const idSubs = request.params.id;

    const subsChecked = await getSubscriptionById(idSubs);

    if (subsChecked)
        response.status(200).json(subsChecked);
    else
        response.status(404).json({ error: 'Inscrição não existe' });
});

module.exports = api => api.use('/api/admin/subs', router);