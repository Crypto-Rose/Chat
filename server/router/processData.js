const express = require('express')
const db = require('../connect')
const bcrypt = require('bcrypt');
const moment = require('moment');
const saltRounds = 10
let router = express.Router();
let day = moment().format();

router
.route("/login")
.post((req,res) => {
    const password = req.body.password
    const user = req.body.user

    const consultLogin = "SELECT user,password FROM users WHERE user=?";  
    db.query(consultLogin,[user],(err,result) => {               
        if(err){
            res.send({err: err})
        }             
        if(result.length > 0){
            bcrypt.compare(password, result[0].password,(error,response) =>{
                if(response){
                    req.session.user = result
                    req.session.save();                    
                    res.status(200).send(result)
                } else {
                    res.status(404).send({message: "Usuario o clave incorrectos"})        
                }                       
            })
        } else {
            res.status(404).send({message: "Usuario no existe"})
        }
    });
})

router
.route("/verifyUser")
.post((req,res) => { 
    console.log(req.body.user, typeof(req.body.user))
    const user = req.body.user    
    if(user !== undefined){
        const consultUser = "SELECT code FROM users WHERE user=?";  
        db.query(consultUser,[user],(err,result) => { 
            console.log(result)            
            if(result.length > 0)
                return res.status(200).send(result)  
            else 
                return res.status(404).send('Usuario no encontrado, vuelva a intentar')  
        })  
    }    
   
})

router 
.route("/register")
.post((req,res) => {
    console.log(req.body)
    const user = req.body.user
    const pass = req.body.password
    const type_user = req.body.typeUser
    const username = req.body.name


    const consultUser = "SELECT code FROM users WHERE user=?";
    db.query(consultUser,user,(err,result) => {               
        if(err){
            res.send({err: err})
        }             
        if(result.length > 0){           
            res.status(404).send({message: "Usuario existente, intente nuevamente"})                       
        } else {
            bcrypt.hash(pass,saltRounds, (err, hash) => {        
                if(err)
                    console.log(err)
                const registerClient = "INSERT INTO users(date_register,user,password,type_user,username) VALUES (?,?,?,?,?)"
                db.query(registerClient,[day,user,hash,type_user,username],(err,result) => {               
                    console.log(err,result)  
                    res.status(200).send({message: "Creado exitosamente"})                        
                });
            }) 
        }
    })     
})

router 
.route("/comments")
.get((req,res) => {

    const consultComment = "SELECT c.code,c.date_register,c.comment,u.username,u.type_user AS type,u.user FROM comments c LEFT JOIN users u ON c.user=u.code ORDER BY c.code ASC";
    db.query(consultComment,(err,result) => {                         
        res.send(result)
    })     
})

router 
.route("/listTypeUser")
.get((req,res) => {

    const consultType = "SELECT * FROM type_users ORDER BY code ASC";
    db.query(consultType,(err,result) => {                      
        res.send(result)
    })     
})

router 
.route("/saveComments")
.post((req,res) => {
    console.log(req.body)
    const user = req.body.user    
    const comment = req.body.comment
    const consultUser = "SELECT code FROM users WHERE user=?"
    db.query(consultUser,[user],(err,result) => {
        const consultComment = "INSERT INTO comments(date_register,user,comment) VALUES (?,?,?)";
        db.query(consultComment,[day,result[0].code ,comment],(err,result) => {
            console.log(err,result)                      
            res.send(result)
        })               
    })     
})


module.exports = router;


