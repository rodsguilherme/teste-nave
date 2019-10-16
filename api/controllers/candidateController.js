const express = require('express');
const router = express.Router();




module.exports = (api) => api.use('/api/admin/candidate', router)
