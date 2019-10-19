
import { vacancyExists } from './vacancyService';
import { candidateExistsById } from './candidateService';


import database from '../database/connectDB';

const createSubscription = async (dataSubscription) => {
    const { idVacancy, idCandidate, idAdmin } = dataSubscription;

    const subscriptionChecked = await subscriptionIsValid(dataSubscription);

    if (!subscriptionChecked) {
        throw ("Dados já cadastrados");
    }
    const insertSubscription = 'INSERT INTO Subscription (idAdmin, idVacancy, idCandidate) VALUES (?, ?, ?)';
    await database.run(insertSubscription, [idAdmin, idVacancy, idCandidate]);
};



const subscriptionIsValid = async dataSubscription => {
    const { idVacancy, idCandidate } = dataSubscription;


    const candidate = await candidateExistsById(idCandidate);
    
    if (!candidate) {
        return false
    }
    const vacancy = await vacancyExists(idVacancy);
   
    if (!vacancy) {
        return false;
    }

    const exists = await subscriptionExists(dataSubscription);
    if (exists) {
        return false;
    }
    return true
};

const subscriptionExists = async subscription => {
    const { idVacancy, idCandidate } = subscription;

    const subscriptionExists = 'SELECT idVacancy, idCandidate FROM Subscription WHERE idVacancy = ? and  idCandidate = ?';
    const subscriptionMatched = await database.get(subscriptionExists, [idVacancy, idCandidate]);
    
    if (subscriptionMatched === undefined) {
        return false;
    }
    return true;
};

const subscriptionExistsById = async ids => {
    const idIsValid = 'SELECT idAdmin, idCandidate, idVacancy FROM Subscription WHERE idAdmin = ? AND idCandidate = ? AND idVacancy = ?';
    const subs = await database.get(idIsValid, [ids]);

    if (subs === undefined) {
        return false
    }
    return true;
};

const getSubscriptionById = async id => {
    

    
        const searchById = 'SELECT * FROM Subscription WHERE idCandidate = ?';
        const subs = await database.get(searchById, [id]);

        return subs;
    
}

const getAllSubscription = async () => {
    const searchSubs = 'SELECT * FROM Subscription';
    const subs = await database.all(searchSubs);
     
    return subs;
};

module.exports = { createSubscription, getSubscriptionById, getAllSubscription };