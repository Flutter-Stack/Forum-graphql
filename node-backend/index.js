const mongoose = require('mongoose');

// mongoose.connect('mongodb://adminuser:adminpassword@mongo-backend:27017/databasetocreate', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connect('mongodb://username:password@host:port/database?options...',
// {useNewUrlParser: true}
// );

// try {
//   mongoose.connect('mongodb://adminuser:adminpassword@0.0.0.0:27017/databasetocreate',
//   { useNewUrlParser: true });
// } catch (error) {
//   console.log(error);
// }

module.exports = {
    url: 'mongodb://adminuser:adminpassword@0.0.0.0:27017/databasetocreate',
    user: 'username',
    pwd: 'password'
}

// mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    user: dbConfig.user,
    pass: dbConfig.pwd
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    process.exit();
});
