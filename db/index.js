const mongoose = require("mongoose");
const DB_URI = 'mongodb://localhost:27017/myapp'


function connect() {
    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV === 'test') {
          const { MongoMemoryServer } = require('mongodb-memory-server');
          const mongod = new MongoMemoryServer(mongoose);
    
          mongod.prepareStorage()
            .then(() => {
              mongoose.connect(DB_URI,
                { useNewUrlParser: true, useCreateIndex: true })
                .then((res, err) => {
                  if (err) return reject(err);
                  resolve();
                })
            })
        } else {
            mongoose.connect(DB_URI,
              { useNewUrlParser: true, useCreateIndex: true })
              .then((res, err) => {
                if (err) return reject(err);
                resolve();
              })
        }
      });
}

function close() {
    return mongoose.disconnect();
  }
  
  module.exports = { connect, close };