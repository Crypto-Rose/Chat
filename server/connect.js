const express = require('express')
const app = express()
const mysql = require('mysql')

const config = {
    host: 'localhost',
    user: 'root',
    password:'0000',
    database: 'prueba'
}
const db = mysql.createPool(config)

module.exports = db;