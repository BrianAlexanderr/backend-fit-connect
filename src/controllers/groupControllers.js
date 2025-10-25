const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateCustomId } = require("../utils/idGenerator")
const path = require("path");

// Create group
const createGroup = async (req, res) => {
  try {
    const { name, description, createdById } = req.body;
    const file = req.file; // multer akan simpan file di sini

    // ✅ Pastikan user ada
    const user = await prisma.user.findUnique({ where: { id: createdById } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // ✅ Generate ID custom (bisa ganti ke fungsi generateCustomId kalau kamu sudah punya)
    const id = await generateCustomId("group", "G");

    // ✅ Buat URL untuk gambar
    const imgUrl = file ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}` : null;

    // ✅ Simpan ke database
    const group = await prisma.group.create({
      data: {
        id,
        name,
        description,
        createdById,
        img: imgUrl,
        members: {
          connect: { id: createdById },
        },
      },
      include: { members: true },
    });

    res.status(201).json(group);
  } catch (err) {
    console.error("❌ Error creating group:", err);
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
      where: { id: groupId },
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
    const { userId } = req.query; // pass userId as query param

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Fetch groups including members
    const groups = await prisma.group.findMany({
      include: { members: true }, // only include members relation
    });

    // Filter out groups where the user is already a member
    const filteredGroups = groups
      .filter(group => !group.members.some(member => member.id === userId))
      .map(group => ({
        id: group.id,
        name: group.name,
        description: group.description,
        img: group.img,
        isExclusive: group.isExclusive,
        price: group.price,
        members: group.members.length, // count number of members
      }));

    res.json(filteredGroups);
  } catch (error) {
    console.error("❌ getAllGroups error:", error);
    res.status(500).json({ error: "Failed to fetch groups with member count" });
  }
};


// Get group by ID
const getGroupById = async (req, res) => {
  const { id } = req.params; // ID from route parameter
  try {
    const group = await prisma.group.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        img: true,
        isExclusive: true,
        price: true,
        createdBy: true,
        createdAt: true,
        members:{
          select: {
            id: true,
            name: true,
            email: true,
            img: true,
          },
        },
        _count: {
          select: { members: true }, // number of members
        },
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Format response
    const result = {
      id: group.id,
      name: group.name,
      description: group.description,
      img: group.img,
      isExclusive: group.isExclusive,
      price: group.price,
      createdBy: group.createdBy,
      createdAt: group.createdAt,
      membersCount: group._count.members,
      members: group.members,
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch group" });
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
    
    const id = await generateCustomId("chat", "C");

    const chat = await prisma.chat.create({
      data: { id, userId, groupId, message },
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
      where: { groupId: groupId },
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
  getGroupById
};
