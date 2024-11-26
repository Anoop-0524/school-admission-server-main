const express = require('express');
const cors = require('cors');

const app = express();
const mysql = require('mysql2')
const dbconfig = require('./config/db.config.js')
const db = mysql.createPool({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB,
    port: dbconfig?.PORT ? dbconfig.PORT : 3306
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get("/api", (req,res) => {
    res.json({message: "Hello" });
});
app.get("/api/getAll", (req,res) => {
    const sqlCount = "Select * from student_data;"
    db.query(sqlCount, (err,result) => {
        console.log("count fetched successfully");
        res.json({ result : result , 'err': err})
    })
})
app.get("/api/add", (req,res) => {
    const sqlInsert = "Insert into "
    db.query(sqlCount, (err,result) => {
        console.log("count fetched successfully");
        res.json({ result : result , 'err': err})
    })
})

app.listen(3001, () => {
    console.log("server running on port : 3001");
});


// INSERT INTO `school-admission-forms`.`student_data` (`reg_no`, `first_name`, `middle_name`, `last_name`, `mothers_name`, `dob`, `gender`, `address`) VALUES ('A00001', 'deva', 'deva', 'deva', 'asdf', 'asdf', 'asdf', 'adsf');
