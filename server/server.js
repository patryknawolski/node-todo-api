const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// Apply middleware that'll parse strings to JSON
app.use(bodyParser.json());

// Create todos endpoint for getting todos
app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    // Sending { todos } instead of todos array is more flexible
    // and let us store additional info, it's good practise
    res.send({todos});
  }, err => {
    res.status(400).send(err);
  });
});

// Create todos endpoint for getting specific todos
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// Create todos endpoint for posting todos
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

// Start a server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };