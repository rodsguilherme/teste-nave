import database from '../database/connectDB';
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from '../services/validationService';


const createCandidate = async dataCandidate => {

    const { name, email, telephone, cpf } = dataCandidate;

    const matched = await verifyCandidate(dataCandidate);


    if (matched) {
        const insertCandidate = 'INSERT INTO Candidate (name, email, telephone, cpf) VALUES (?, ?, ?, ?)';
        await database.run(insertCandidate, [name, email, telephone, cpf]);
    }


};

const verifyCandidate = async candidateChecked => {
    const { name, email, telephone, cpf } = candidateChecked;

    if (!name) {
        throw ("Insira o nome.");
    }
    if (validate(cpf) == false) {
        throw ("Insira um CPF valido");
    }

    const emailChecked = emailValidation(email);
    if (emailChecked == false) {
        throw ("Insira um email valido");
    }

    const telephoneChecked = telephoneValidation(telephone);
    if (telephoneChecked == false) {
        throw ("Insira um telefone valido.");
    }

    const searchCandidateByCpf = 'SELECT idCandidate FROM Candidate WHERE cpf = ?';
    const candidateMatchedByCpf = await database.get(searchCandidateByCpf, [cpf]);

    if (candidateMatchedByCpf !== undefined) {
        throw ("CPF já cadastrado");
    }

    const searchCandidateByEmail = 'SELECT idCandidate FROM Candidate WHERE email = ?';
    const candidateMatchedByEmail = await database.get(searchCandidateByEmail, [email]);

    if (candidateMatchedByEmail !== undefined) {
        throw ("Email já cadastrado.")
    }
    return true;
}

module.exports = { createCandidate };