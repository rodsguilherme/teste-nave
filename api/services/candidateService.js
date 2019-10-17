import database from '../database/connectDB';
import { createHash } from '../services/cryptografyService';
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from '../services/validationService';

const createCandidate = async (dataCandidate) => {

    const { name, email, telephone, cpf } = dataCandidate;
    if (validate(cpf) === false) {
        throw ("Insira um CPF válido");
    }


    const insert = 'INSERT INTO Candidate (name, email, telephone, cpf) VALUES (?, ?, ?, ?)';
    await database.run(insert, [name, email, telephone, createHash(cpf)]);

};

module.exports = { createCandidate };