const express = require("express");
const { createUser, findUser, updateUser } = require("../controllers/userControllers");

const router = express.Router();

// POST /users
router.post("/", createUser);
router.get('/find', findUser);
router.put('/update/:id', updateUser);

module.exports = router;

