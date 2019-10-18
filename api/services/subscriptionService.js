
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
    
    const ifExist = await ifSubscriptionExists(dataSubscription);
  
    if (!ifExist) { 
        throw ("Candidato já cadastrado na vaga.");
    }
};

const ifSubscriptionExists = async subscription => {
    const { idVacancy, idCandidate } = subscription;

    const subscriptionExists = 'SELECT idVacancy, idCandidate FROM Subscription WHERE idVacancy = ? and  idCandidate = ?';
    const subscriptionMatched = await database.get(subscriptionExists, [idVacancy, idCandidate]);

  
    if (subscriptionMatched !== undefined) {
        return false;
    }
    return true;
};

module.exports = { createSubscription };