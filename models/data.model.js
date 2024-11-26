const connectionRequest = require("./db.js");

// constructor
const StudentData = function (studentData) {
    this.regNo = studentData.regNo,
    this.firstName = studentData.firstName,
    this.middleName = studentData.middleName,
    this.lastName = studentData.lastName,
    this.placeOfBirth = studentData.placeOfBirth,
    this.whatsapp = studentData.whatsapp,
    this.caste = studentData.caste,
    this.subcaste = studentData.subcaste,
    this.dob = studentData.dob,
    this.gender = studentData.gender,
    this.address = studentData.address,
    this.city = studentData.city,
    this.state = studentData.state,
    this.zip = studentData.zip,
    this.country = studentData.country,
    this.sibling1name = studentData.sibling1name,
    this.sibling1std = studentData.sibling1std,
    this.sibling2name = studentData.sibling2name,
    this.sibling2std = studentData.sibling2std,
    // this.standard = studentData.standard,
    // this.lastSchool = studentData.lastSchool,
    // page 2
    this.fatherName = studentData.fatherName,
    this.fatherAge = studentData.fatherAge,
    this.fatherProfession = studentData.fatherProfession,
    this.fatherLang = studentData.fatherLang,
    this.fatherEducation = studentData.fatherEducation,
    this.fatherContact = studentData.fatherContact,
    this.fatherIncome = studentData.fatherIncome,
    this.fatherLangKnown = studentData.fatherLangKnown,

    this.motherName = studentData.motherName,
    this.motherAge = studentData.motherAge,
    this.motherProfession = studentData.motherProfession,
    this.motherLang = studentData.motherLang,
    this.motherEducation = studentData.motherEducation,
    this.motherContact = studentData.motherContact,
    this.motherIncome = studentData.motherIncome,
    this.motherLangKnown = studentData.motherLangKnown,

    this.mentorName = studentData.mentorName,
    this.mentorRelation = studentData.mentorRelation,
    this.mentorAge = studentData.mentorAge,
    this.mentorProfession = studentData.mentorProfession,
    this.mentorLang = studentData.mentorLang,
    this.mentorEducation = studentData.mentorEducation,
    this.mentorContact = studentData.mentorContact,
    this.mentorIncome = studentData.mentorIncome

    // this.monthlyIncome = studentData.monthlyIncome
};

StudentData.create = (newStudentData, result) => {
    sql = connectionRequest();
    sql.query("SELECT MAX(regNo) as lastId FROM student_data;", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            // return -1;
            sql.destroy()
            return ;
        }
        lastId = res[0].lastId
        console.log("Last Id: ", res[0].lastId);
        // return res;
        if (lastId == null) {
            // newStudentData.regNo = "A00001"
            newStudentData.regNo = "N0001"
        } else {
            lastId = parseInt(lastId.substr(1,4))+1
            lastId = "N"+String(lastId).padStart(4,'0')
            newStudentData.regNo = lastId
        }
        console.log("newRegNo: ", newStudentData.regNo)
        sql.query("INSERT INTO student_data SET ? ", newStudentData, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                sql.destroy()
                return;
            }
    
            console.log("Added new student data: ", { id: res.insertId, reg: res, ...newStudentData });
            // console.log("response data: ", res);
            // result(null,{res})
            result(null, newStudentData);
            sql.destroy()
        });
    });
    
};

StudentData.findById = (id, result) => {
    sql = connectionRequest();
    sql.query("SELECT * FROM student_data WHERE reg_no = ?",id, (err, res) => {
        if (err) {
            console.log("error: ", err, 'id: ',id);
            result(err, null);
            sql.destroy();
            return;
        }

        if (res.length) {
            console.log("found data: ", res[0]);
            result(null, res[0]);
            sql.destroy();
            return;
        }

        // not found Data with the id
        result({ kind: "not_found" }, null);
        sql.destroy();
    });
};

StudentData.getAll = (title, result) => {
    sql = connectionRequest();
    let query = "SELECT * FROM student_data";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            sql.destroy();
            return;
        }

        console.log("student_data: ", res);
        result(null, res);
        sql.destroy();
    });
};

// Tutorial.getAllPublished = result => {
//     sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log("tutorials: ", res);
//         result(null, res);
//     });
// };

// Tutorial.updateById = (id, tutorial, result) => {
//     sql.query(
//         "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//         [tutorial.title, tutorial.description, tutorial.published, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Tutorial with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated tutorial: ", { id: id, ...tutorial });
//             result(null, { id: id, ...tutorial });
//         }
//     );
// };

// Tutorial.remove = (id, result) => {
//     sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0) {
//             // not found Tutorial with the id
//             result({ kind: "not_found" }, null);
//             return;
//         }

//         console.log("deleted tutorial with id: ", id);
//         result(null, res);
//     });
// };

// Tutorial.removeAll = result => {
//     sql.query("DELETE FROM tutorials", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} tutorials`);
//         result(null, res);
//     });
// };

module.exports = StudentData;
