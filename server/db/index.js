const mongoose = require('mongoose')

const { SERVER_NAME } = require('../constance')

// const uri = 'mongodb://localhost:27017/manager-vue'
const uri = `mongodb+srv://susuperli:cvQ0yrZDGFr1mKHO@cluster0.c6xhtvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}

async function connect() {
  try {
    console.time('db connecting time')
    await mongoose.connect(uri, clientOptions)
    const db = mongoose.connection

    // removeUniqueConstraint(db)

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.timeEnd('db connecting time')
      console.log('Connected to MongoDB')
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

async function removeUniqueConstraint(db) {
  const collection = db.collection('clockIn')
  await collection.dropIndex('username_1')
}

connect().catch(console.dir)

module.exports = mongoose
