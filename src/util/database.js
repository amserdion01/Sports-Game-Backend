require("dotenv").config()

export const dbURL = `${process.env.MONGO_URI}`;
