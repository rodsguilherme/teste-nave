import database from '../database/connectDB';

const getDate = () => {
    const dateNow = new Date;
    const localdate = (`${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getUTCFullYear()}`);
    return localdate;
}


const createVacancy = async dataVacancy => {
    const { name, skill, description } = dataVacancy;

    if (!name || !skill || !description) {
        throw ("Valide os campos");
    }
    
    const insertVacancy = 'INSERT INTO Vacancy (name, skill, description, date) VALUES (?,?,?,?)';
    await database.run(insertVacancy, [name, skill, description, getDate()]);

};

const vacancyExists = async vacancy => {
    const id = vacancy;

    if (!id || id === 0) {
        return false;
    }
    const checkVacancy = 'SELECT idVacancy FROM Vacancy WHERE idVacancy = ?';
    const vacancyChecked = await database.get(checkVacancy, [id]);

    if (vacancyChecked === undefined) {
        return false;
    }
    return true;
};

module.exports = { createVacancy, vacancyExists };


