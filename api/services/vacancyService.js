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


    if (!vacancy || vacancy === 0) {
        return false;
    }
    const checkVacancy = 'SELECT idVacancy FROM Vacancy WHERE idVacancy = ?';
    const vacancyChecked = await database.get(checkVacancy, [vacancy]);

    if (vacancyChecked === undefined) {
        return false;
    }
    return true;
};

const getVacancyById = async id => {
    const vacancyChecked = await vacancyExists(id);

    if (vacancyChecked) {
        const searchById = 'SELECT * FROM Vacancy WHERE idVacancy = ?';
        const vacancy = await database.get(searchById, [id]);

        return vacancy;
    }
};

const getAllVacancys = async () => {
    const searchVacancys = 'SELECT * FROM Vacancy ORDER BY idVacancy';
    const vacancys = await database.all(searchVacancys);

    return vacancys;
};

module.exports = { createVacancy, vacancyExists, getVacancyById, getAllVacancys };


