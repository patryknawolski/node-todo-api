const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log(db.collection('Todos').find().toArray());

  db.collection('Todos').find({ text: 'Walk the dog' }).toArray().then(docs => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, err => {
    console.log('Unable to fetch Todos', err)
  });

  // db.close();
});