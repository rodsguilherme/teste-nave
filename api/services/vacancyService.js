const database = require('../database/connectDB');

const createVacancy = async (dataVacancy) => {
    const { name, skill, description } = dataVacancy;

    if (!name || !skill || !description) {
        throw new Error("Valide os campos");
    }
    const insert = 'INSERT INTO Vacancy (name, skill, description) VALUES (?,?,?)';
    await database.run(insert, [name, skill, description]);

};

module.exports = { createVacancy };


