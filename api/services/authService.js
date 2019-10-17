import jwt from 'jsonwebtoken';
import { verifyAdmin } from './adminService';

const privateKey = 'supersecreatepass';

const tokenGenerator = async() => {
    verifyAdmin(name, password, id)
  return  jwt.sign({id: verifyAdmin.id}, privateKey);
}

module.exports = { tokenGenerator }