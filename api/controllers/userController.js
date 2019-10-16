const express = require('express');
const route = express.Router();

const servicesAdmin = use('api/services/servicesAdmin');

createAdmin((request, response) => {
    servicesAdmin.dataAdmin.then((message) => {
        response.status(200).json({ sucess: message });
    }).catch((error) => {
        response.status(400).json({ error: error });
    });
})
