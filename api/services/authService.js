import jwt from 'jsonwebtoken';

const privateKey = 'supersecreatepass';

const tokenGenerator = (userId) => {
  return  jwt.sign({ id: userId }, privateKey);
}

const  verifyJWT = (req, res, next) =>{
  var token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log(token)  
  if(token.startsWith('Bearer ')) {
    token = token.slice(7,token.length)
  }
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, privateKey, function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

module.exports = { tokenGenerator, verifyJWT}