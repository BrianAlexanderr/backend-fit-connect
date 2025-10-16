const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Generate custom incremental ID with prefix
 * Example: generateCustomId("event", "E") -> "E001"
 */
const generateCustomId = async (modelName, prefix) => {
  const count = await prisma[modelName].count();
  const next = count + 1;
  return `${prefix}${next.toString().padStart(3, "0")}`;
};

module.exports = { generateCustomId };

