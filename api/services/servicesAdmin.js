const express = require('express');
const router = express.Router();

const md5 = require('md5');
const database = require('../database/connectDB');


let DataAdmin = new Promise((resolve, reject) => {

    router.post('/', (request, response) => {
        const { name, password } = request.body;
        if (name && password) {
            database.serialize(() => {
                const select = 'SELECT id FROM Admin WHERE name = ?';
                database.all(select, [name], (error, rows) => {
                    if (rows.length > 0) {
                        reject('Admin já existe!');
                    }
                });
            });
            database.serialize(() => {
                const insert = 'INSERT INTO Admin (name, password) VALUES (?, ?)';
                database.run(insert, [name, md5(password)], (error) => {
                    if (error) {
                        reject('Não foi possivel cadastrar!');
                    }
                    else {
                        resolve('Cadastrado com sucesso!');
                    }
                });
            });
        }
        else {
            reject('Preencha os dados corretamente!');
        }
    });

})

module.exports = (api) => api.use('/api/admin', router);