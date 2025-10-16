const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateCustomId } = require("../utils/idGenerator");

// Create training
const createTraining = async (req, res) => {
  try {
    const { title, description, coachId, date, price, slots} = req.body;
    
    const id = await generateCustomId("training", "T");
    
    const training = await prisma.training.create({
      data: {
        id,
        title,
        description,
        coachId,
        img,
        date: new Date(date),
        price,
        slots
      },
    });
    res.json(training);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all trainings
const getAllTrainings = async (req, res) => {
  try {
    const trainings = await prisma.training.findMany({
      include: { coach: true },
    });
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Join training
const joinTraining = async (req, res) => {
  try {
    const { userId, trainingId } = req.body;
    const parsedTrainingId = parseInt(trainingId);

    const training = await prisma.training.findUnique({
      where: { id: parsedTrainingId },
    });

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Check if there are available slots
    if (training.slots <= 0) {
      return res.status(400).json({ message: "No available slots" });
    }

    // Check if already joined
    const existing = await prisma.trainingParticipant.findFirst({
      where: { userId, trainingId: parseInt(trainingId) },
    });
    if (existing) return res.status(400).json({ message: "User already joined this training" });

     const [participant, updatedTraining] = await prisma.$transaction([
      prisma.trainingParticipant.create({
        data: {
          userId,
          trainingId: parsedTrainingId,
          status: "REGISTERED",
        },
      }),
      prisma.training.update({
        where: { id: parsedTrainingId },
        data: { slots: { decrement: 1 } },
      }),
    ]);

    res.json({
      message: "Successfully joined the training",
      participant,
      remainingSlots: updatedTraining.slots,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get trainings joined by a specific user
const getUserTrainings = async (req, res) => {
  try {
    const { userId } = req.params;
    const trainings = await prisma.trainingParticipant.findMany({
      where: { userId },
      include: {
        training: true,
      },
    });
    res.json(trainings.map((t) => t.training));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update participant status
const updateParticipation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.trainingParticipant.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTraining,
  getAllTrainings,
  joinTraining,
  getUserTrainings,
  updateParticipation,
};
