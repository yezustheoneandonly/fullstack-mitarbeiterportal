import dotenv from "dotenv";

dotenv.config();

class ConfigError extends Error {}

class Config {
  constructor({ DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT, JWT_SECRET }) {
    if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME || !JWT_SECRET)
      throw new ConfigError("Missing configuration");

    this.port = 3001;
    this.dbUser = DB_USER;
    this.dbPass = DB_PASS;
    this.dbHost = DB_HOST;
    this.dbName = DB_NAME;
    this.jwtSecret = JWT_SECRET;
  }
}

export default new Config(process.env);
