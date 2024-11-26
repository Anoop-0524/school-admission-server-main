const StudentData = require("../models/data.model.js");

// Create and Save a new Student Data
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Stud obj.
    const studentData = new StudentData({
        regNo: req.body.regNo,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        placeOfBirth: req.body.placeOfBirth,
        whatsapp: req.body.whatsapp,
        dob: req.body.dob,
        gender: req.body.gender,
        caste: req.body.caste,
        subcaste: req.body.subcaste,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        sibling1name: req.body.sibling1name,
        sibling1std: req.body.sibling1std,
        sibling2name: req.body.sibling2name,
        sibling2std: req.body.sibling2std,
        // standard: req.body.standard,
        // lastSchool: req.body.lastSchool,
        // page 2
        fatherName: req.body.fatherName,
        fatherAge: req.body.fatherAge,
        fatherProfession: req.body.fatherProfession,
        fatherLang: req.body.fatherLang,
        fatherEducation: req.body.fatherEducation,
        fatherContact: req.body.fatherContact,
        fatherIncome: req.body.fatherIncome,
        fatherLangKnown: req.body.fatherLangKnown,

        motherName: req.body.motherName,
        motherAge: req.body.motherAge,
        motherProfession: req.body.motherProfession,
        motherLang: req.body.motherLang,
        motherEducation: req.body.motherEducation,
        motherContact: req.body.motherContact,
        motherIncome: req.body.motherIncome,
        motherLangKnown: req.body.motherLangKnown,

        mentorName: req.body.mentorName,
        mentorRelation: req.body.mentorRelation,
        mentorAge: req.body.mentorAge,
        mentorProfession: req.body.mentorProfession,
        mentorLang: req.body.mentorLang,
        mentorEducation: req.body.mentorEducation,
        mentorContact: req.body.mentorContact,
        mentorIncome: req.body.mentorIncome,

        // monthlyIncome: req.body.monthlyIncome

    })

    // Save StudentData in the database
    StudentData.create(studentData, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while saving the Data."
            });
        else res.send(data);
    });
};

// Retrieve all Students Data from the database (with condition).
exports.findAll = (req, res) => {
    // const title = req.query.title;
    const title = null;
    const pwd = req.headers['admin']
    if (pwd && pwd === 'qwerty') {
        StudentData.getAll(title, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving students data."
                });
            else res.send(data);
        });
    }
    else {
        res.send("Not allowed");
    }
};

// Find a single StudentData with a id
exports.findOne = (req, res) => {
    StudentData.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student Data with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student Data with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
