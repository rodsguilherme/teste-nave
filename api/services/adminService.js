import database from '../database/connectDB';
import { createHash, verifyHash } from './cryptografyService';
import { emailValidation } from './validationService';
import {tokenGenerator} from './authService';

const createAdmin = async dataAdmin => {
    const { name, password, email } = dataAdmin;

    if (!name || !password) {
        throw ("Preencha os dados corretamente!");
    }
    if(emailValidation(email) === false) {
        throw ("Insira um email válido");
    }

    const insertAdmin = 'INSERT INTO Admin (name, password) VALUES (?, ?)';
    await database.run(insertAdmin, [name, createHash(password), email]);
};

const verifyAdmin = async dataAdmin => {
    const { password, email, id } = dataAdmin;

    if (!password) {
        throw ("Preencha os dados corretamente!");
    }
    if (emailValidation(email) === false) {
        throw ("Insira um email válido.");
    }

    const selectByEmail = 'SELECT idAdmin FROM Admin WHERE email = ?';
    const adminSelected = await database.get(selectByEmail, [email]);

    if (adminSelected == null) {
        throw ("Usuário ou senha incorretas!");
    }
    const match = verifyHash(password, adminSelected.password);
    if (match === false) {
        throw ("Senha incorreta!");
    }
   
    
};


module.exports = { createAdmin, verifyAdmin };

