import mongoose from "mongoose";
import { createRandomString } from "../../utils/createRandomString.js";
import User from "../../../models/User.js";

const fix_username = `newuser${createRandomString(5)}`;

const dropDb = async () => {    
    await mongoose.connection.db.dropCollection("users")        
}

export {
    fix_username,
    dropDb
}