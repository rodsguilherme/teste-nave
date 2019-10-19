import express from 'express';
const router = express.Router();

import { createSubscription, getSubscriptionById, getAllSubscription } from '../services/subscriptionService';
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


router.get('/', verifyJWT, async (request, response) => {
    const subscriptions = await getAllSubscription();

    if (subscriptions !== 0)
        response.status(200).json({ subscriptions });
    else
        response.status(400).json({ error: 'Não foi possivel retornar as inscrições' });

});


module.exports = api => api.use('/api/admin/subs', router);