import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/TodoListDB`
    );

    console.log(
      `DB connection successfully || ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`DB error on connectDB.js || ${error}`);
    process.exit(1);
  }
};

export default connectDB;
