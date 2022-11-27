import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()// initialize dotenv
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
export const connection = () => {
    const MONGODB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@jiraticketclone.o7lslss.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true })
        .then(() => {
            console.log("Database connected successfully")
        }).catch((err) => {
            console.log("Error while connecting with the database ", err.message);
        })
}
