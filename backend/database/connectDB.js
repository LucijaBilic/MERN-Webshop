import mongoose from "mongoose";

const connectDB = (URL) => {
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

export default connectDB;