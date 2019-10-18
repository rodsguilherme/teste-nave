import database from '../database/connectDB';
import { createHash } from './cryptografyService';
import { verifyHash } from './cryptografyService';
import { emailValidation } from './validationService';

const createAdmin = async dataAdmin => {
    const { name, password, email } = dataAdmin;

    await verifyAdmin(dataAdmin);

    const insertAdmin = 'INSERT INTO Admin (name, password, email) VALUES (?, ?, ?)';
    await database.run(insertAdmin, [name, await createHash(password), email]);


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
    await database.get(selectByEmail, [email]);

    await Promise.reject('Email já cadastrado, tente com outro.').catch(err => {
        throw (err);
    });

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
    const adminMatched = await database.get(searchByEmail, [email]);

    if (adminMatched === undefined) {
        throw ("Email não cadastrado.");
    }

    const matchPassword = await verifyHash(password, adminMatched.password);
    if (matchPassword == false) {
        throw ("Email ou senha não existem, tente novamente.");
    }

};

const login = async dataAdmin => {

    await verifyLogin(dataAdmin);

};

module.exports = { createAdmin, verifyAdmin, login };

