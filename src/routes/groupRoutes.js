const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupControllers');

router.post('/create', groupController.createGroup);
router.put('/update/:id', groupController.updateGroup);
router.delete('/delete/:id', groupController.deleteGroup);
router.post('/join', groupController.joinGroup);
router.post('/leave', groupController.leaveGroup);
router.get('/all', groupController.getAllGroups);
router.get('/user/:userId', groupController.getUserGroups);
router.post('/chat', groupController.sendChat);
router.get('/chat/:groupId', groupController.getGroupChats);

module.exports = router;
