const db = require("../models");
const User = db.users;

exports.createUser = async (req, res) => {
  const user = new User({
    number: req.body.number,
    createNew: req.body.createNew,
    firstLogin: true
  })
  user.save().then((data) => {
    res.send(data);   
  })
}

// Create and Save a new Tutorial
exports.createNewpage = async (req, res) => {
  // Validate request
  try {
    let checkExist = await User.findOne({ link: req.body.number });

    if (!checkExist) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    if (req.body.type === "love") {
      if (!req.body.message) {
        res.status(400).send({ message: "Message can not be empty!" });
        return;
      }

      if (!req.body.name) {
        res.status(400).send({ message: "Name can not be empty!" });
        return;
      }

      if (!req.body.timeStart) {
        res.status(400).send({ message: "Time start can not be empty!" });
        return;
      }

      if (!req.body.link) {
        res.status(400).send({ message: "Link can not be empty!" });
        return;
      }
      const newPage = {
        index: checkExist.pages.length,
        name: req.body.name,
        message: req.body.message,
        timeStart: req.body.timeStart,
        type: "love",
      };

      checkExist.pages.push(newPage);
      await checkExist.save();
      res.send(checkExist);
    }
    else{
      res.status(400).send({ message: "Type not found" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const number = req.body.number;
  const password = req.body.password;
  User.findOne({ number: number })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
        return;
      }
      if (data.password !== password) {
        res.status(400).send({ message: "Password is not correct" });
        return;
      }
      delete data.password;
      res.send(data);
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    }
    );
}

exports.updatePassword = async (req, res) => {
  try {
    let checkExist = await User.findOne({ link: req.body.number });

    if (!checkExist) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    if (!req.body.password) {
      res.status(400).send({ message: "Password can not be empty!" });
      return;
    }
    // lam password hoi mat day xiu tai luoi
    checkExist.password = req.body.password;
    checkExist.firstLogin = false;
    await checkExist.save();
    delete checkExist.password;
    res.send(checkExist);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.findUserByNumber = (req, res) => {
  const number = req.query.number;
  User.findOne({ number: number })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with number " + number });
      else {
        delete data.password
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving User with number=" + number });
    });
};

exports.findPageByNumberAndIndex = (req, res) => {
  const number = req.query.n;
  const index = req.query.i;
  User.findOne({ number: number })
    .then((data) => {
      if (!data || !data.pages[index]) 
        res.status(404).send({ message: "Not found User with number " + number + " and index " + index });
      else res.send(data.pages[index]);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving User with number=" + number });
    });
};

// Update a Tutorial by the id in the request
exports.updatePageByNumberAndIndex = (req, res) => {
  // res.set({ "Access-Control-Allow-Origin": "*" });
User.findOne({ number: req.body.number })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with link=${link}. Maybe User was not found!`,
        });
      } else {
        newData = req.body
        delete newData.number
        data.pages[req.body.index] = newData;
        data.save();
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with link=" + link,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.deletePageByNumberAndIndex = (req, res) => {
  const number = req.query.number;
  const index = req.query.index;
  User.findOne({ number: number })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with link=${link}. Maybe User was not found!`,
        });
      } else {
        data.pages.splice(index, 1);
        data.save();
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting User with link=" + link,
      });
    });
}




// res.set("Access-Control-Allow-Origin", "*");
// res.set("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
// res.set(
//   "Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
// );
// res.set("Access-Control-Allow-Credentials", true);