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
    const { userId } = req.query; // get userId from query param
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Fetch all events with participants and creator
    const events = await prisma.event.findMany({
      orderBy: { title: 'asc' },
      include: {
        createdBy: true,
        participants: {
          include: { user: true },
        },
        _count: {
          select: { participants: true },
        },
      },
    });

    // Exclude events where user has already joined
    const filteredEvents = events
      .filter(event =>
        !event.participants.some(p => p.userId === userId)
      )
      .map(event => ({
        ...event,
        participantCount: event._count.participants,
      }));

    res.json(filteredEvents);
  } catch (err) {
    console.error("❌ getAllEvents error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params; // e.g. /events/E001

    if (!id) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        createdBy: true, // include event creator details
        participants: {
          include: {
            user: true, // include participant user info
          },
        },
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Format event for cleaner response
    const formattedEvent = {
      ...event,
      participantCount: event._count.participants,
    };

    res.json(formattedEvent);
  } catch (error) {
    console.error("❌ getEventById error:", error);
    res.status(500).json({ error: "Failed to fetch event details" });
  }
};

// Join event
const joinEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({ message: "Missing userId or eventId" });
    }

    // Prevent duplicate participation
    const existing = await prisma.eventParticipant.findFirst({
      where: { userId, eventId },
    });
    if (existing) return res.status(400).json({ message: "User already joined this event" });

    // Generate a new ID for EventParticipant
    const newId = await generateCustomId("eventParticipant", "EP");
    // Adjust idGenerator usage according to your implementation

    const participant = await prisma.eventParticipant.create({
      data: {
        id: newId,
        userId,
        eventId,
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

module.exports = { createEvent, getAllEvents, joinEvent, getUserEvents, getEventById };
