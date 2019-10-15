const express = require('express');
const cors = require('cors');
const api = express();

api.use(cors());

const port = 3000;
api.listen(port, () => {
    console.log(`Api rodando na porta: ${port}`);
})

