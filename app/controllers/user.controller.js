const db = require("../models");
const User = db.users;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }
  if (!req.body.message) {
    res.status(400).send({ message: "Message can not be empty!" });
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

  let checkExist = await User.findOne({link: req.body.link});
  if (checkExist) {
    res.status(400).send({ message: "Link is already exist!" });
    return;
  }

  // Create a Tutorial
  const user = new User({
    name: req.body.name,
    message: req.body.message,
    timeStart: req.body.timeStart,
    link: req.body.link
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating User."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const link = req.query.link;
  User.findOne({link: link})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with link " + link });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with link=" + link });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  User.findOneAndUpdate({link: req.body.link}, req.body, {
    new: true
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with link=${link}. Maybe User was not found!`
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with link=" + link
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
