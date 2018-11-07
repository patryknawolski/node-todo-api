const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'Wash the dishes'
  },
  {
    _id: new ObjectID(),
    text: 'Clean the bathroom'
  }
]

// This function runs before every test case
// and ensures that the database is empty
beforeEach(done => {
  // Removes all todos
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// Test /todos GET route
describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should get todo', done => {
    const todo = todos[0];

    request(app)
      .get(`/todos/${todo._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todo.text);
        // expect(res.body.todo.length).toBe(1);
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
      
  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/213`)
      .expect(404)
      .end(done);
  });
});

// Test /todos POST route
describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Walk the cat';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        // Make sure that the todo from response
        // has the same text that the one from request
        expect(res.body.text).toBe(text);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        // Make sure that new todo is in the database
        Todo.find().then(todos => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create a new todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end(err => {
        if (err) {
          return done(err);
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2);
          done();
        }).catch(err => done(err));
      });
  });
});