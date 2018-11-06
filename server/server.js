const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

// Apply middleware that'll parse strings to JSON
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    // Sending { todos } instead of todos array is more flexible
    // and let us store additional info, it's good practise
    res.send({todos});
  }, err => {
    res.status(400).send(err);
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
app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };



// // Create a new Todo
// const newTodo = new Todo({
//   text: 'Walk the dog',
//   completed: false,
//   completedAt: 123
// });

// // Save todo to the database, error handling included
// // newTodo.save().then(doc => {
// //   console.log('Saved todo', doc);
// // }, err => {
// //   console.log('Unable to save todo', err)
// // });

// // User
// // email - required - trimmed - string - minlength of 1

// const newUser = new User({
//   email: 'patryknawolski@gmail.com'
// });

// newUser.save().then(doc => {
//   console.log('User was added');
//   console.log(newUser, undefined, 2);
// })