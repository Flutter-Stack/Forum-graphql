$ git clone https://github.com/Flutter-Stack/Forum-graphql.git

$ cd nodejs-docker-compose
$ docker-compose up -d

in browser http://0.0.0.0:3000/graphql loads graphql playground


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
