
import { ifVacancyExists } from './vacancyService';
import { ifCandidateExists } from './candidateService';

import database from '../database/connectDB';




const createSubscription = async dataSubscription => {
    const { idVacancy, idCandidate } = dataSubscription;

    await verifySubscription(dataSubscription);

    const insertSubscription = 'INSERT INTO Subscription (idVacancy, idCandidate) VALUES (?, ?)';
    await database.run(insertSubscription, [idVacancy, idCandidate]);

};

const verifySubscription = async dataSubscription => {
    const { idVacancy, idCandidate } = dataSubscription;

    const candidate = await ifCandidateExists(idCandidate);
    if (!candidate) {
        throw ("Candidato não existe, verifique os campos e tente novamente.");
    }
    const vacancy = await ifVacancyExists(idVacancy);
    if (!vacancy) {
        throw ("Vaga não existe, verifique os campos e tente novamente.");
    }
};

module.exports = { createSubscription };