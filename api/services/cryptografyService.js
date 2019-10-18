import bcrypt from 'bcrypt';
const saltRounds = 10
const saltKey = '!VWi@g:a:b"<^|a';

const createHash = async (text) => {
    return await bcrypt.hash(`${text}${saltKey}`, saltRounds);
}

const verifyHash = (textToCripto, textToCompare) => {
    return bcrypt.compareSync(`${textToCripto}${saltKey}`, textToCompare);
};
module.exports = { createHash, verifyHash };