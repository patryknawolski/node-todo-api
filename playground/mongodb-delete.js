const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  // db.collection('Todos').findOneAndDelete('')
  db.collection('Todos').deleteMany({ text: 'Walk the dog' });

  // db.close();
});