import bcrypt from "bcrypt";

// Function to hash a password
export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Function to compare a password with a hashed password
export async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}