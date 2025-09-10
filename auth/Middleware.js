const jwt = require('jsonwebtoken');

const auth = (requiredRole = null) => {

  return async (req, res, next) => {
    try {
      let token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
      token = token.split(' ')[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token is not valid' });
        } else {
          console.log(decoded);
          req.user = decoded;
          if (requiredRole && decoded.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied' });
          }
          next();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  }
}

module.exports = auth;