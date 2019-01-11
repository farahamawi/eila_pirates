const jwt = require('jsonwebtoken');

class Auth {

  login(req, res) {
    // We don't have users model so just for testing purposes we'll create a mocking user
    const user = {
      id: 1,
      username: 'farah',
      email: 'amawifarah@gmail.com',
    }

    jwt.sign({ user }, process.env.SECRET, (err, token) => {
      res.json({ token });
    })
  }


}

module.exports = Auth;
