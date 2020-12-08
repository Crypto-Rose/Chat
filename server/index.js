const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const processData = require('./router/processData')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(
    session({
        key: "userId",
        secret:"subscribe",
        resave: true,
        saveUninitialized: true,
        cookie: {
            expires: 60 * 60 * 24,
        }
    })
)

app.use("/set",processData);
app.listen(3000);
