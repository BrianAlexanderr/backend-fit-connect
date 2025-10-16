const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingControllers');

router.post('/create', trainingController.createTraining);
router.get('/all', trainingController.getAllTrainings);
router.post('/join', trainingController.joinTraining);
router.get('/user/:userId', trainingController.getUserTrainings);
router.put('/update-status/:id', trainingController.updateParticipation);

module.exports = router;
