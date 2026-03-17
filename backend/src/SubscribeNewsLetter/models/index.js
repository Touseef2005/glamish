import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    }
});

const Model = mongoose.model("Subscribes", dataSchema);

export default Model;