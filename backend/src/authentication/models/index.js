import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            maxlength: [50, "Name cannot exceed 50 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please enter your email address"],
            unique: true,
            index: true,
            validate: {
                validator: (value) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), // Email validation regex
                message: "Please enter a valid email address",
            },
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Prevent password from being returned in queries
        },
        phone: {
            type: String,
            validate: {
                validator: (value) =>
                    /^\+?[1-9]\d{1,14}$/.test(value), // E.164 format for phone numbers
                message: "Please enter a valid phone number",
            },
        },
        address: {
            type: String,
            maxlength: [200, "Address cannot exceed 200 characters"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: {
            public_id: {
                type: String,
                default: null,
            },
            url: {
                type: String,
                default: null,
            },
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true }
);

// Pre-save hook for hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};
const Model = model("User", userSchema);

export default Model 
