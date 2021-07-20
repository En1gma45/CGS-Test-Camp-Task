import config from "config";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    // const mongoURI: string = config.get("mongodb+srv://Djavid:2553945d5@cluster0.o8tqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect("mongodb+srv://Djavid:2553945d5@cluster0.o8tqg.mongodb.net/intern?retryWrites=true&w=majority", options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
