const express = require('express');
const router = express.Router();

  let students = [];
  router.post('/add', (req, res) => {
    let id = Number(req.body.id);
    let name = req.body.name;
    let age = Number(req.body.age);
    let course = req.body.course;
    let email = req.body.email;
    const student = students.find(student => student.id === id);
    if (student) {
      return res.status(400).json({
        message: "Student exists"
      });
    }
    if (name.trim() == "") {
      return res.status(400).json({
        message: "Name cannot be empty"
      });
    }
    if (age <= 17) {
      return res.status(400).json({
        message: "Age must be greater than 17"
      });
    }
    if (!email.includes('@')) {
      return res.status(400).json({
        message: "Email is invalid"
      });
    }
    students.push({
      id,
      name,
      age,
      course,
      email
    });

    res.status(201).json({
      message: "Student added sucessfully"
    });
  });

router.get('/display', (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({
      message: "No students found"
    });
  }
  res.status(200).json(students);

});


router.get('/count', (req, res) => {
    if (students.length === 0) {
        return res.status(404).json({
            message: "No students found"
        });
    }
    res.status(200).json({
        totalStudents: students.length
    });
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);
  const studentData = students.find(student => student.id === id);
  if (!studentData) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
  res.status(200).json(studentData);
});



router.put('/:id', (req, res) => {
  let id = Number(req.params.id);
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
  students[index].name = req.body.name;
  students[index].age = Number(req.body.age);
  students[index].course = req.body.course;
  students[index].email = req.body.email;
  res.status(200).json({
    message: "Student updated successfully"
  });
});


router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);
  const index = students.findIndex(student => student.id === id);
  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
  students.splice(index, 1);
  res.status(200).json({
    message: "Student deleted successfully"
  });
});


module.exports = router;