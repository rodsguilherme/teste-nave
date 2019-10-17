import { verifyHash } from './cryptografyService'
import { validate } from 'cpf-check';

import database from '../database/connectDB';


const createSubscription = async (dataSubscription) => {

    const { nameVacancy, cpfCandidate } = dataSubscription;

    if (!nameVacancy) {
        throw ("Verifique os campos!");
    }
    if (validate(cpfCandidate) === false) {
        throw ("Digite um CPF válido!");
    }
    const selectCandidatebyCpf = 'SELECT idCandidate FROM Candidate WHERE cpf = ?';
    const candidatesSelected = await database.get(selectCandidatebyCpf, [cpfCandidate]);
    if (candidatesSelected == null) {
        throw ("Nenhum candidato com esse CPF foi encontrado.");
    }
    const match = verifyHash(cpfCandidate, candidatesSelected.cpf);
    if (match === false) {
        throw ("Candidato já cadastrado na vaga.");
    }

    const selectSubscription = 'SELECT * FROM Subscription WHERE idVacancy = ? and idCandidate = ?';
    const subscriptionSelected = await database.get(selectSubscription, [vacancysSelecteds.idVacancy, candidatesSelected.idCandidate]);

    if (subscriptionSelected != null) {
        throw ("Candidato já cadastrado na vaga.");
    }
    
    const insert = 'INSERT INTO Subscription (idVacancy, idCandidate) VALUES (?, ?)';
    await database.run(insert, [vacancysSelecteds.idVacancy, candidatesSelected.idCandidate]);



};

module.exports = { createSubscription };