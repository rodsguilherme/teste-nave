import express from 'express';
const router = express.Router();

import { verifyJWT } from '../services/authService';
import { createCommentary, getCommentaryByIdSubs } from '../services/commentaryService';

router.post('/', verifyJWT, async (request, response) => {
    const dataCommentary = {
        idAdmin: request.userId,
        idSub: request.body.idSub,
        commentary: request.body.commentary
    };
    try {
        await createCommentary(dataCommentary);
        response.status(201).json('Comentário postado!');
    } catch (error) {
        response.status(400).json({ error: 'Não foi possivel criar o comentário' });
    }
});

router.get('/:id', verifyJWT, async (request, response) => {
    const idSubs = request.params.id;

    const commentarys = await getCommentaryByIdSubs(idSubs);

    if (commentarys)
        response.status(200).json(commentarys);
    else
        response.status(404).json({ error: 'Inscrição sem comentarios' });
});

module.exports = (api) => api.use('/api/admin/comentario', router)