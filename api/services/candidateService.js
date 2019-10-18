import database from '../database/connectDB';
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from '../services/validationService';


const createCandidate = async dataCandidate => {

    const { name, email, telephone, cpf } = dataCandidate;

    await verifyCandidate(dataCandidate);
    const insertCandidate = 'INSERT INTO Candidate (name, email, telephone, cpf) VALUES (?, ?, ?, ?)';

    await database.run(insertCandidate, [name, email, telephone, cpf]);

};

const verifyCandidate = async candidateChecked => {
    const { name, email, telephone, cpf } = candidateChecked;

    if (!name) {
        throw ("Insira o nome.");
    }
    if (!validate(cpf)) {
        throw ("Insira um CPF valido");
    }

    if (!emailValidation(email)) {
        throw ("Insira um email valido");
    }


    if (!telephoneValidation(telephone)) {
        throw ("Insira um telefone valido.");
    }

    const searchCandidateByCpf = 'SELECT idCandidate FROM Candidate WHERE cpf = ?';
    const candidateMatchedByCpf = await database.get(searchCandidateByCpf, [cpf]);

    if (candidateMatchedByCpf !== undefined) {
        throw ("CPF já cadastrado");
    }

    const searchCandidateByEmail = 'SELECT idCandidate FROM Candidate WHERE email = ?';
    await database.get(searchCandidateByEmail, [email]);

    await Promise.reject('Email já cadastrado').catch(err => {
        throw (err);
    });
};

const ifCandidateExists = async id => {
    const idCandidate = id;

    if (!idCandidate || idCandidate <= 0) {
        return false;
    }

    const candidateIsValid = 'SELECT idCandidate FROM Candidate WHERE idCandidate = ?';
    const candidate = await database.get(candidateIsValid, [idCandidate]);
    
    if (candidate == undefined) {
        return false;
    }
    return true;
}
module.exports = { createCandidate, ifCandidateExists };