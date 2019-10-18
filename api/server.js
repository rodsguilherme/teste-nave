import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const api = express();

api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());


api.get('/', (req, res) => {
    res.send('hello');
})

require('./controllers/subscriptionController')(api);
require('./controllers/candidateController')(api);
require('./controllers/vacancyController')(api);
require('./controllers/adminController')(api);
require('./controllers/commentaryController') (api);
require('./controllers/loginController')(api);

const port = 3000;
api.listen(port, () => {
    console.log(`Api rodando na porta: ${port}`);
})

