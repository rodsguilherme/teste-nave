import database from '../database/connectDB';
import { createHash } from './cryptografyService';
import { verifyHash } from './cryptografyService';
import { emailValidation } from './validationService';

const createAdmin = async dataAdmin => {
    const { name, password, email } = dataAdmin;

    const adminChecked = await verifyAdmin(dataAdmin);

    if (adminChecked) {
        const insertAdmin = 'INSERT INTO Admin (name, password, email) VALUES (?, ?, ?)';
        await database.run(insertAdmin, [name, await createHash(password), email]);
    }

};

const verifyAdmin = async dataAdmin => {
    const { name, password, email } = dataAdmin;

    if (!password || !name) {
        throw ("Preencha os dados corretamente!");
    }

    const emailChecked = emailValidation(email);
    if (emailChecked === false) {
        throw ("Insira um email valido.");
    }

    const selectByEmail = 'SELECT password FROM Admin WHERE email = ?';
    const adminSelected = await database.get(selectByEmail, [email]);

    if (adminSelected !== undefined) {
        throw ("Email cadastrado, tente novamente");
    }

    return true;

};

const verifyLogin = async dataAdmin => {
    const { email, password } = dataAdmin;
    if (!password) {
        throw ("Preencha todos os campos.");
    }

    const emailChecked = emailValidation(email);
    if (emailChecked === false) {
        throw ("Email invalido.");
    }

    const searchByEmail = 'SELECT password FROM Admin WHERE email = ?';
    const emailMatched = await database.get(searchByEmail, [email]);

    if (emailMatched === undefined) {
        throw ("Email não cadastrado, tente novamente.");
    }

    const matchPassword = await verifyHash(password, emailMatched.password);
    if (matchPassword == false) {
        throw ("Email ou senha não existem, tente novamente.");
    }

    return true;

};

const login = async dataAdmin => {

    await verifyLogin(dataAdmin);

};

module.exports = { createAdmin, verifyAdmin, login };

