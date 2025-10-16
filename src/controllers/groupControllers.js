const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateCustomId } = require("../utils/idGenerator")

// Create group
const createGroup = async (req, res) => {
  try {
    const { name, description, createdById } = req.body;

    // Optional: Check user exists first
    const user = await prisma.user.findUnique({ where: { id: createdById } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const id = await generateCustomId("group", "G");

    // ✅ Create group and connect creator as both creator + member
    const group = await prisma.group.create({
      data: {
        id,
        name,
        description,
        createdById,
        img,
        members: {
          connect: { id: createdById }, // add creator to _UserGroups
        },
      },
      include: {
        members: true,
      },
    });

    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update group
const updateGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const updated = await prisma.group.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete group
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.group.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Join group
const joinGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    await prisma.group.update({
      where: { id: parseInt(groupId) },
      data: { members: { connect: { id: userId } } },
    });
    res.json({ message: 'User joined group' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leave group
const leaveGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    await prisma.group.update({
      where: { id: parseInt(groupId) },
      data: { members: { disconnect: { id: userId } } },
    });
    res.json({ message: 'User left group' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        img: true,
        isExclusive: true,
        price: true,
        _count: {
          select: { members: true }, // relasi ke tabel pivot
        },
      },
    });

    const result = groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      img: group.img,
      isExclusive: group.isExclusive,
      price: group.price,
      members: group._count.members, // ✅ jumlah member
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch groups with member count" });
  }
};

// Get user's groups
const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { groups: true },
    });
    res.json(user.groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Chat in group
const sendChat = async (req, res) => {
  try {
    const { userId, groupId, message } = req.body;
    const chat = await prisma.chat.create({
      data: { userId, groupId: parseInt(groupId), message },
    });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get group chat messages
const getGroupChats = async (req, res) => {
  try {
    const { groupId } = req.params;
    const chats = await prisma.chat.findMany({
      where: { groupId: parseInt(groupId) },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  getAllGroups,
  getUserGroups,
  sendChat,
  getGroupChats,
};
