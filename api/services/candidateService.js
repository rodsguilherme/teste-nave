import database from '../database/connectDB';
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from '../services/validationService';

const createCandidate = async dataCandidate => {

    const { name, email, telephone, cpf } = dataCandidate;

    if(emailValidation(email) === false) {
        throw ("Insira um email válido.");
    }

    if(telephoneValidation(telephone) === false) {
        throw ("Insira um telefone válido.");
    }

    if (validate(cpf) === false) {
        throw ("Insira um CPF válido.");
    }

    const selectByEmail = 'SELECT idCandidate FROM Candidate WHERE email = ?';
    const row = await database.get(selectEmail, [email]);

    if (row != null) {
        throw ("Esse email já foi cadastrado, tente novamente com outro.");
    }
    const selectByCpf = 'SELECT idCandidate FROM Candidate WHERE cpf = ?';
    const cpfSelected = await database.get(selectByCpf, [cpf]);

    if (cpfSelected !== null) {
        throw ("Usuário já cadastrado.");
    }
    const insert = 'INSERT INTO Candidate (name, email, telephone, cpf) VALUES (?, ?, ?, ?)';
    await database.run(insert, [name, email, telephone, cpf]);

};


module.exports = { createCandidate };