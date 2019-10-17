import bcrypt from 'bcrypt';
const saltRounds = 10;
const saltKey = '!VWi@g:a:b"<^|a';

const createHash = (text) => {
    return bcrypt.hashSync(`${text}${saltKey}`, saltRounds);
}

const verifyPass = (password, passwordHash) => {
   return bcrypt.compareSync(password, passwordHash);
}

module.exports = { createHash, verifyPass };