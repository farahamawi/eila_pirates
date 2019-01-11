const jwt = require('jsonwebtoken');

module.exports = {
  // varify token
  isAuthenticated: (req, res, next) => {
    // FORMAT OF TOKEN
    // Authorization: Bearer <access_token>

      // Get auth header value
      const bearerHeader = req.headers['authorization'];
      // check if bearer is not undefined
      if (bearerHeader) {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // Set the token
        jwt.verify(bearerToken, process.env.SECRET, (err, auth) => {
          if (err) {
            res.status(403).json({ error: 'User not authorized.' });
          } else {
            req.token = bearerToken;
            // Next middleware
            next();
          }
        })
      } else {
        res.status(403).json({ error: 'User not authorized.' });
      }
  },
};
