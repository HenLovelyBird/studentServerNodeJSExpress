const express = require("express");
const fs = require("fs");//cross compatibility
const path = require("path");
const router = express.Router();
const filePath = path.join(__dirname, "students.json");//path to dir with cross compatibility

const readFile = filePath => {
    const buffer = fs.readFileSync(filePath);
    const fileContent = buffer.toString();
    return (JSON.parse(fileContent));
};
//req for students i all
router.get('/', (req, res) => {
    const studentsArray = readFile(filePath);
    res.send(studentsArray);
});
//READ http://localhost:3000/students/ to GET all the users

//req for student by query of name
router.get('/', (req, res)=> {
    const studentsArray = readFile(filePath);
    const filteredStudents = studentsArray.filter(student => student.hasOwnProperty("name") && 
    name.toLowerCase() === req.query.name.toLowerCase())
    res.send(filteredStudents);
}); //READ http://localhost:3000/students?name=penny&ID=2 to GET a prop of a particular student


// req for particular student id number
router.get('/:id', (req, res)=> {
    const studentsArray = readFile(filePath);
    const findStudent = studentsArray.find(
        student => student.ID === Number.parseInt(req.params.id)
    );
    console.log(req.params.id);
    if (findStudent){
        res.send(findStudent);
    } else {
        res.status(401).send(`Student ${req.params.id} not found!`);
    }
});// READ http://localhost:3000/students/1 to GET a single user by id

router.post('/', (req, res) => {
    const studentsArray = readFile(filePath);
    const newStudent = {
        ...req.body,
        Name: "Penny Pinkerton",
        Description:"a manifesto on P2P economies",
        Creation: Date(),
        ID: studentsArray.length + 1,
        RepoURL:"",
        LiveURL:"",
        StudentID:studentsArray.length+1
    };
    studentsArray.push(newStudent);
    fs.writeFileSync(filePath, JSON.stringify(studentsArray));
    res.status(201).send(`${newStudent._id}`);
});// CREATE http://localhost:3000/students/ to POST a single user


router.put('/:id', (req, res)=> {
    const modifyStudent = req.body;
    const studentsArray = readFile(filePath);
    studentsArray[req.params.id -1] = modifyStudent; //-1?
    fs.writeFileSync(filePath, JSON.stringify(studentsArray));
    res.send(modifyStudent);
});// PUT http://localhost:3000/students/ to UPDATE a single user

// router.delete();

module.exports = router;