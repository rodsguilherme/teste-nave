const bcrypt = require('bcrypt');
const saltRounds = 10;
const saltKey = '!VWi@g:a:b"<^|a';

const createHash = (text) => {
    return bcrypt.hashSync(`${text}${saltKey}`, 10);
}

const verifyPass = (password, passwordHash) => {
   return bcrypt.compareSync(password, passwordHash);
}

module.exports = { createHash, verifyPass };