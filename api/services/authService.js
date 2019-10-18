import jwt from 'jsonwebtoken';

const privateKey = 'supersecreatepass';

const tokenGenerator = (userId) => {
  return jwt.sign({ id: userId }, privateKey);
}

const verifyJWT = (request, response, next) => {
  var token = request.headers['x-access-token'] || request.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (!token) return response.status(401).send({ auth: false, message: 'Nenhum token foi usado.' });

  jwt.verify(token, privateKey, function (err, decoded) {
    if (err) return response.status(401).send({ auth: false, message: 'Falha na autenticação do token' });
    request.userId = decoded.id.idAdmin;
    next();
  });
};

module.exports = { tokenGenerator, verifyJWT };