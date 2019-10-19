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
        response.status(201).send('Inscrição feita com sucesso!');
    } catch (error) {
        response.status(400).send({ Error: 'Erro ao efetuar a inscrição.' });
    }
});

router.get('/:id', verifyJWT, async (request, response) => {
    const idSubs = request.params.id;

    const subsChecked = await getSubscriptionById(idSubs);

    if (subsChecked)
        response.status(200).send(subsChecked);
    else
        response.status(404).send({ error: 'Inscrição não existe' });
});

module.exports = api => api.use('/api/admin/subs', router);