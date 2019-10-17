import database from '../database/connectDB';
import { createHash, verifyHash } from '../services/cryptografyService';
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from '../services/validationService';

const createCandidate = async (dataCandidate) => {

    const { name, email, telephone, cpf } = dataCandidate;

    const select = 'SELECT idCandidate FROM Candidate WHERE email = ?';
    const row = await database.get(select, [email]);
    if (row != null) {
        throw ("Esse email já foi cadastrado, tente novamente com outro.");
    }

    const insert = 'INSERT INTO Candidate (name, email, telephone, cpf) VALUES (?, ?, ?, ?)';
    await database.run(insert, [name, email, telephone, createHash(cpf)]);

};


module.exports = { createCandidate };