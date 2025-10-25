const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupControllers');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nama unik
  },
});

const upload = multer({ storage });

router.post('/create', upload.single("img"), groupController.createGroup);
router.put('/update/:id', groupController.updateGroup);
router.delete('/delete/:id', groupController.deleteGroup);
router.post('/join', groupController.joinGroup);
router.post('/leave', groupController.leaveGroup);
router.get('/all', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById)
router.get('/user/:userId', groupController.getUserGroups);
router.post('/chat', groupController.sendChat);
router.get('/chat/:groupId', groupController.getGroupChats);

module.exports = router;
