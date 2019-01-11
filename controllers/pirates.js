const https = require('https');
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

  count(req, res) {
    https.get('https://eila-pirate-api.herokuapp.com/pirates/prison', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', async() => {
        const pirates = JSON.parse(data);
        const count = await this.countValidPiratesFaces(pirates.faces);
        res.json({ piratesFound: count })
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }

  async countValidPiratesFaces(arr) {
    const validEyes = ['8', ';'];
    const validNoses = ['-', '~'];
    const validMouths = [')', '|'];
    let count = 0;
    await arr.forEach(async(value, index) => {
      const hasEyes = value && validEyes.includes(value[0]);
      const hasNose = value && (value.length === 2 || validNoses.includes(value[1]));
      const hasMouth = value && validMouths.includes(value[value.length - 1]);
      if (hasEyes && hasNose && hasMouth) {
        count++;
      }
    })
    return count;
  }
}

module.exports = Pirates;


