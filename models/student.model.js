const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(\d{2}-\d{5})$/,
            "Please enter a valid student ID."
        ]
    },
    first_name: {
        type: String,
        required: [true, "Please don't leave blank."],

    },
    middle_name: String,
    last_name: {
        type: String,
        required: [true, "Please don't leave blank."],

    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: [true, "Please provide a gender."]
    },
    year_level : {
        type: String,
        required: [true, "Please provide a year level"]
    },
    course: {
        type: String,
        required: [true, "Please provide a course"]
    },
    section: {
        type: String,
        required: [true, "Please provide a section"]
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email."
        ]
    },
    contact_number: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(09\d{9})$/,
            "Please enter a valid contact number."
        ],
    },
    address_line1: {
        type: String, 
        required: [true, "Please provide an address."]
    },
    address_line2: String,

    attendance_record: {
        timeIn: [Date],
        timeOut: [Date]
    }
});

module.exports = Student = mongoose.model('Student', StudentSchema);