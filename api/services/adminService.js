import database from '../database/connectDB';
import { createHash, verifyPass } from './cryptografyService';

const createAdmin = async (dataAdmin) => {
    const { name, password } = dataAdmin;

    if (!name || !password) {
        throw ("Preencha os dados corretamente!");
    }

    const insert = 'INSERT INTO Admin (name, password) VALUES (?, ?)';
    await database.run(insert, [name, createHash(password)]);
};

const verifyAdmin = async (dataAdmin) => {
    const { name, password } = dataAdmin;

    if (!name || !password) {
        throw ("Preencha os dados corretamente!");
    }

    const select = 'SELECT * FROM Admin WHERE name = ?';
    const selected = await database.get(select, [name]);
    database.close();
    if (selected.password == null) {
        throw ("Usuário ou senha incorretas!");
    }
    const match = verifyPass(password, selected.password);

    if (match === false) {
        throw ("Usuário ou senha incorretas!");
    }
};


module.exports = { createAdmin, verifyAdmin };

