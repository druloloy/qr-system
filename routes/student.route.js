const router = require('express').Router();
const { add, returnID } = require('../controllers/student.controller');

router.post('/add', add);
router.get('/:student_id', returnID);

module.exports = router;