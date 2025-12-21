import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb










// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect("mongodb+srv://omorsk911_db_user:pxx4BZxqKM37z4Fm@cluster0.ib6gkih.mongodb.net/LMS")
//     .then(() => { console.log('DB Connected') })
// }