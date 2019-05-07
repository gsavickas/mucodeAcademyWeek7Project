const pool = require("../connections").pool;
const bcrypt = require("bcrypt");

function create(req, res){
    pool.query("SELECT * FROM USER WHERE username = ?", 
    [req.body.username], (err, queryReturn)=>{
        if(queryReturn[0]){
            return res.send("USERNAME ALREADY EXISTS")
        }
        let password = bcrypt.hashSync(req.body.password, 5);
        let username = req.body.username;
        pool.query("INSERT INTO USER (username, password) VALUES(?,?)", [username, password], (err, result)=>{
            if(!err){
                return res.send("Signed Up!");
            }
            console.log(err);
            res.status(500).send({error: "SOMETHING BROKE"})
        })
    })    
}

function getAll(req, res){
    pool.query("SELECT id, username FROM USER", (err, result)=>{
        res.send({
            error: err,
            users: result
        })
    })
}

function login(req, res){
    pool.query("SELECT * FROM USER WHERE username = ?", [req.body.username], (err, result)=>{
        if(result[0]){
            if( bcrypt.compareSync(req.body.password, result[0].password)){
                return res.send({message: "Welcome Back!"})
            }
            else{
                return res.send({error: "Invalid Username or Password"});
            }
        }
        res.send({error: "Invalid Username or Password"})
    })
}

module.exports.getAll = getAll;
module.exports.login = login;
module.exports.create = create;