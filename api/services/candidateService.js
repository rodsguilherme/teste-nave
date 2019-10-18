import database from '../database/connectDB';
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from '../services/validationService';


const createCandidate = async dataCandidate => {

    const { name, email, telephone, cpf } = dataCandidate;

    const candidateChecked = await candidateIsValid(dataCandidate);
    if (!candidateChecked) {
        throw ("Valide os campos e tente novamente.");
    }
    const insertCandidate = 'INSERT INTO Candidate (name, email, telephone, cpf) VALUES (?, ?, ?, ?)';
    await database.run(insertCandidate, [name, email, telephone, cpf]);

};

const getCandidateByEmail = async email => {
    const searchByEmail = 'SELECT idCandidate FROM Candidate WHERE email = ?';
    return await database.get(searchByEmail, [email]);
};

const getCandidateByCpf = async cpf => {
    const searchByCpf = 'SELECT idCandidate FROM Candidate WHERE cpf = ?';
    return await database.get(searchByCpf, [cpf]);
}

const candidateIsValid = async candidateChecked => {
    const { name, email, telephone, cpf } = candidateChecked;

    if (!name || !validate(cpf) || !emailValidation(email) || !telephoneValidation(telephone)) {
        return false;
    }

    const candidateMatchedByCpf = await getCandidateByCpf(cpf);
    if (candidateMatchedByCpf !== undefined) {
        throw ("CPF já cadastrado");
    }

    const emailChecked = await getCandidateByEmail(email);
    if (emailChecked !== undefined) {
        throw ("Email já existe.");
    }
    return true;

};

const candidateExists = async id => {
    if (!id || id <= 0) {
        return false;
    }

    const searchByIdCandidate = 'SELECT idCandidate FROM Candidate WHERE idCandidate = ?';
    const candidate = await database.get(searchByIdCandidate, [id]);

    if (candidate == undefined) {
        return false;
    }
    return true;
}
module.exports = { createCandidate, candidateExists };