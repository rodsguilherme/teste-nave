import { verifyHash } from './cryptografyService'
import { validate } from 'cpf-check';

import database from '../database/connectDB';


const createSubscription = async (dataSubscription) => {

    const { nameVacancy, nameCandidate, cpfCandidate } = dataSubscription;

    if (!nameVacancy) {
        throw ("Verifique os campos!");
    }
    if (validate(cpfCandidate) === false) {
        throw ("Digite um CPF válido!");
    }
    const selectVacancy = 'SELECT * FROM Vacancy WHERE name = ?'
    const vacancysSelecteds = await database.get(selectVacancy, [nameVacancy]);
    if (vacancysSelecteds == null) {
        throw ("Nenhuma vaga com esse nome foi encontrada.");
    }
    const selectCandidate = 'SELECT * FROM Candidate WHERE name = ?';
    const candidatesSelected = await database.get(selectCandidate, [nameCandidate]);
    if (candidatesSelected == null) {
        throw ("Nenhum candidato com esse nome foi encontrado.");
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