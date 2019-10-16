const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const api = express();

api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());


api.get('/', (req, res) => {
    res.send('hello');
})


require('./controllers/vacancyController')(api);
require('./controllers/adminController')(api);

const port = 3000;
api.listen(port, () => {
    console.log(`Api rodando na porta: ${port}`);
})

