const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

// This function runs before every test case
// and ensures that the database is empty
beforeEach(done => {
  // Removes all todos
  Todo.remove({}).then(() => done());
});

// Test /todos post route
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
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
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
          expect(todos.length).toBe(0);
          done();
        }).catch(err => done(err));
      });
  });
});