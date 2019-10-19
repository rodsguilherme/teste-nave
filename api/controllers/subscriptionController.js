import express from 'express';
const router = express.Router();

import { createSubscription, getSubscriptionById, getAllSubscription } from '../services/subscriptionService';
import { createCommentary } from '../services/commentaryService';
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
    else {
        response.status(400).json({ error: 'Não foi possivel retornar as inscrições' });
    }
});



router.post('/comentario', verifyJWT, async (request, response) => {
    const dataCommentary = {
        idAdmin: request.userId,
        idSubs: request.body.idSubs,
        commentary: request.body.commentary
    };
    try {
        await createCommentary(dataCommentary);
        response.status(201).json('Comentário postado!');
    } catch (error) {
        response.status(400).json({ error: 'Não foi possivel criar o comentário' });
    }
});

router.get('/:id', async (request, response) => {
    const idCandidate = request.param.id;

    const candidateChecked = await getSubscriptionById(idCandidate);

    if (candidateChecked !== undefined)
        response.status(200).json({ candidateChecked });
    else
        response.status(400).json({ error: 'Não foi possivel retornar a inscrição.' });
});

module.exports = api => api.use('/api/admin/subs', router);