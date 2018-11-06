const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//   if (err) {
//     return console.log('Unable to connect to MongoDB server');
//   }

//   console.log('Connected to MongoDB server');

//   db.collection('Users').insertOne({
//     name: 'Patryk',
//     age: 20,
//     location: 'Warsaw'
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert user');
//     }

//     console.log(result.ops[0].id.stamp);
//   });

//   db.close();
// });