import database from '../database/connectDB';

const getDate = () => {
    const dateNow = new Date;
    const localdate = (`${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getUTCFullYear()}`);
    return localdate;
}



const createVacancy = async dataVacancy => {
    const { name, skill, description} = dataVacancy;

    if (!name || !skill || !description) {
        throw ("Valide os campos");
    }
    
    const insertVacancy = 'INSERT INTO Vacancy (name, skill, description, date) VALUES (?,?,?,?)';
    await database.run(insertVacancy, [name, skill, description, getDate()]);

};

const verifyVacancy = async vacancy => {
    const { id } = vacancy;

    if (!id || id === 0) {
        throw ("Insira uma vaga.");
    }

    const checkVacancy = 'SELECT idVacancy FROM Vacancy WHERE idVacancy = ?';
    const vacancyChecked = await database.get(checkVacancy, [id]);

    if (vacancyChecked == null) {
        throw ("Vaga não existe, tente novamente");
    }
    return true;

};

module.exports = { createVacancy, verifyVacancy };


