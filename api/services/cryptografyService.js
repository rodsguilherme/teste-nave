import bcrypt from 'bcrypt';
const saltRounds = 10;
const saltKey = '!VWi@g:a:b"<^|a';

const createHash = (text) => {
    return bcrypt.hashSync(`${text}${saltKey}`, saltRounds);
}

const verifyHash = (textToCripto, textToCompare) => {
   return bcrypt.compareSync(textToCripto, textToCompare);
}

module.exports = { createHash, verifyHash };