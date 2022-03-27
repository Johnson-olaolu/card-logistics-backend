const { default: mongoose } = require("mongoose")

const ConnectDB = async () => {
    const user = process.env.MONGO_DB_USER
    const password = process.env.MONGO_DB_PASSWORD
    const host = process.env.MONGO_DB_HOST
    const dbName =process.env.MONGO_DB_NAME
    // const connURI = `mongodb://${user}:${password}@${host}/${dbName}`
    const connURI = process.env.MONGO_DB_URI
    const conn = await mongoose.connect(connURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    if (conn) {
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } else {
        console.log("Error connecting to db")
    }
}

module.exports ={
    ConnectDB
}