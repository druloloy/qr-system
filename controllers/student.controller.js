const Student = require('../models/student.model');
const ExceptionHandler = require('../utils/ExceptionHandler');

exports.add = async (req, res, next)=>{
    const { student_id, first_name, middle_name, last_name, birthdate, gender, year_level, course, section, email, contact_number, address_line1, address_line2 } = req.body;

    if(!student_id || !first_name || !last_name || !birthdate || !gender || !year_level || !course || !section || !email || !contact_number || !address_line1)
        return next(new ExceptionHandler("Please complete the fields.",400));

    try {
        const student = await Student.create({
            student_id,
            first_name,
            middle_name,
            last_name,
            birthdate,
            gender,
            year_level,
            course,
            section,
            email,
            address_line1,
            address_line2,
            contact_number
        });
        res.status(201).json({
            success: true,
            message: "Student Added!"
        })
    } catch (error) {
        next(error);
    }

}
exports.returnID = async (req, res, next) => {
    const { student_id } = req.params;

    try {
        await Student.findOne( { student_id } )
        .then(result=>{
            res.status(200).json({
                success: true,
                studID: result._id
            });
        })
        .catch(error=>{
            next(error);
        })
    } catch (error) {
        next(error);
    }
} 