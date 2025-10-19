const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateCustomId } = require('../utils/idGenerator');

// Create event
const createEvent = async (req, res) => {
  try {
    const { title, description, eventType, startDate, endDate, location, isPaid, price, createdById } = req.body;
    
    const id = await generateCustomId("event", "E");

    const event = await prisma.event.create({
      data: {
        id,
        title,
        description,
        eventType,
        img,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        isPaid,
        price,
        createdById,
      },
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        title: 'asc',
      },
      include: {
        createdBy: true,
        participants: {
          include: { user: true },
        },
        _count: {
          select: {participants: true},
        }
      },
    });

    const formattedEvents = events.map(event => ({
      ...event,
      participantCount: event._count.participants,
    }));

    res.json(formattedEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Join event
const joinEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Prevent duplicate participation
    const existing = await prisma.eventParticipant.findFirst({
      where: { userId, eventId: parseInt(eventId) },
    });
    if (existing) return res.status(400).json({ message: "User already joined this event" });

    const participant = await prisma.eventParticipant.create({
      data: {
        userId,
        eventId: parseInt(eventId),
        status: "REGISTERED",
      },
    });
    res.json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get events joined by a specific user
const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await prisma.eventParticipant.findMany({
      where: { userId },
      include: {
        event: true,
      },
    });
    res.json(events.map((e) => e.event));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEvent, getAllEvents, joinEvent, getUserEvents };
