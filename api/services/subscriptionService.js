import { validate } from 'cpf-check';
import { verifyVacancy } from './vacancyService';

import database from '../database/connectDB';

const createSubscription = async (dataSubscription) => {

    const { idVacancy, cpfCandidate } = dataSubscription;

    if (!idVacancy || idVacancy === 0) {
        throw ("Insira o nome da vaga.");
    }
    if (validate(cpfCandidate) === false) {
        throw ("Digite um CPF valido!");
    }

    const match = verifyVacancy(idVacancy);
    if ( match === true) {
        throw ("Vaga não registrada, tente novamente.");
    }

    const searchByCpfOfCandidate = 'SELECT idCandidate FROM Candidate WHERE cpf = ?';
    const candidateSelected = await database.get(searchByCpfOfCandidate, [cpfCandidate]);

    if (candidateSelected == null) {
        throw ("Candidato não registrado, tente novamente.");
    }

    const searchSubscription = 'SELECT idVacancy, idCandidte FROM Subscription WHERE idVacancy = ? and idCandidate = ?';
    const subscriptionMatched = await database.get(searchSubscription, [vacancySelected, candidateSelected]);

    if (subscriptionMatched !== null) {
        throw ("Candidato já cadastrado na vaga!");
    }

    const insertSubscription = 'INSERT INTO Subscription (idVacancy, idCandidate) VALUES (?, ?)';
    await database.run(insertSubscription, [vacancySelected, candidateSelected]);




};

module.exports = { createSubscription };