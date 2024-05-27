import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//reserch mongodb id

const useSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudnary se ayega
            required: true,
        },
        coverImage: {
            type: String, //cloudnary se ayega
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "Password is required!"]
        },
        refrashToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

useSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next();
})

// custom method

useSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

useSchema.methods.generateAccessToken = function () {
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

useSchema.methods.generateRefrashToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRASH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRASH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", useSchema)

