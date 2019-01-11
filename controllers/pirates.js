const Pirates_db = require('../models/pirates_model.js');

class Pirates {
  addOne(req, res) {
    const { name, age, isCaptured } = req.body;
    const newPirate = Pirates_db({
      name,
      age,
      isCaptured,
    });
    newPirate.save((err, newData) => {
      if (err) {
        res.send(500, { error: err.message });
      } else {
        res.status(200).send(newData);
      }
    });
  }

  getAll(req, res) {
    Pirates_db.find({}, {
      __v: false,
      _id: false
    })
		.exec((err, pirates) => {
      if (err) {
        res.send(500, { error: err.message });
      } else {
        res.status(200).send(pirates);
      }
		});
  }
}

module.exports = Pirates;
