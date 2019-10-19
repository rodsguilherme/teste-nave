import database from '../database/connectDB';
import { createHash } from './cryptografyService';
import { verifyHash } from './cryptografyService';
import { emailValidation } from './validationService';

const createAdmin = async dataAdmin => {
    const { name, password, email } = dataAdmin;

    const admin = await adminExists(dataAdmin);
    if (!admin) {
        throw ("Administrador registrado.");
    }

    const insertAdmin = 'INSERT INTO Admin ( name, password, email) VALUES (?, ?, ?)';
    await database.run(insertAdmin, [name, createHash(password), email]);

};

const idAdminIsValid = async id => {
    const idAdmin = 'SELECT idAdmin FROM Admin where idAdmin = ?';
    const idChecked = await database.get(idAdmin, [id]);

    if (idChecked === undefined) {
        return false;
    }
    return true;
}

const getAdminById = async id => {

    const idAdmin = await idAdminIsValid(id);
    if (idAdmin) {
        const searchById = 'SELECT idAdmin, name, email FROM Admin WHERE idAdmin = ?';
        const search = await database.get(searchById, [id]);
    
        return search;
    }

}

const adminExists = async dataAdmin => {
    const { name, password, email } = dataAdmin;

    if (!password || !name) {
        return false;
    }

    const emailChecked = emailValidation(email);
    if (emailChecked === false) {
        return false;
    }

    const selectByEmail = 'SELECT password FROM Admin WHERE email = ?';
    const emailMatched = await database.get(selectByEmail, [email]);

    if (emailMatched === false) {
        return false;
    }
    return true;
};

const verifyLogin = async dataAdmin => {
    const { email, password } = dataAdmin;
    if (!password) {
        return false;
    }

    const emailChecked = emailValidation(email);
    if (emailChecked === false) {
        return false;
    }

    const searchByEmail = 'SELECT * FROM Admin WHERE email = ?';
    const adminMatched = await database.get(searchByEmail, [email]);

    if (adminMatched === undefined) {
        return false
    }

    const matchPassword = await verifyHash(password, adminMatched.password);
    if (matchPassword == false) {
        return false
    }
    return true;

};

const getAdminIdByEmail = async email => {

    const searchByEmail = 'SELECT idAdmin FROM Admin WHERE email = ?';
    const emailMatched = await database.get(searchByEmail, [email]);

    return emailMatched
}

const loginAdmin = async dataAdmin => {
    return await verifyLogin(dataAdmin);
};

module.exports = { createAdmin, loginAdmin, getAdminIdByEmail, getAdminById };

