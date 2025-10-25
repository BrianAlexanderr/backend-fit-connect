const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers');

router.post('/create', eventController.createEvent);
router.get('/all', eventController.getAllEvents);
router.post('/join', eventController.joinEvent);
router.get('/:id', eventController.getEventById);
router.get('/user/:userId', eventController.getUserEvents);

module.exports = router;
