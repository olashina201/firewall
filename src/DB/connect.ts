import mongoose from "mongoose"

export const connect = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    };
    // connect you DB here
    await mongoose.connect(process.env.DB_URL as string, options);
    console.log("connected to DB");
  } catch (err: any) {
    console.log(err.toString());
  }
};
