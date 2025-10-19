const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createUser = async (req, res) => {
  try {
    const { id, name, email, role, img, dateOfBirth, phone} = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: "id, name, and email are required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser,
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        id,
        name,
        email,
        role: role || "USER",
        img: img || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone: phone || null,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const findUser = async (req, res) => {
  const { id, email } = req.query;

  if (!id && !email) {
    return res.status(400).json({ error: 'Please provide id or email' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: id ? { id } : { email },
      select: {
        name: true, // only select the name
        email: true,
        role: true,
        img: true,
        createdAt: true,
        dateOfBirth: true,
        phone: true
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user); // returns { name: '...' }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.img !== undefined) updateData.img = data.img;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.dateOfBirth !== undefined) {
      updateData.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    }
    if (data.role !== undefined) updateData.role = data.role;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("❌ Prisma error detail:", error);
    return res.status(500).json({ error: "Failed to update user", detail: error.message });
  }
};


module.exports = {
  createUser,
  findUser,
  updateUser
};
