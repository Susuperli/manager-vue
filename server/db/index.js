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
    await mongoose.connect(uri, clientOptions)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('Connected to MongoDB')
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

connect().catch(console.dir)

module.exports = mongoose
