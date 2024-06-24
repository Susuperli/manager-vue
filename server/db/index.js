const mongoose = require('mongoose')

// const uri = 'mongodb://localhost:27017/manager-vue'
const uri =
  'mongodb+srv://susuperli:UBG2fGW55U9KQOGW@manager-vue.mc02qse.mongodb.net/?retryWrites=true&w=majority&appName=manager-vue'
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
