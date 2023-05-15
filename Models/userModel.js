import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            validate: [validator.isEmail, "please enter a valid email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter a Password"],
            validate: [
                validator.isStrongPassword,
                "please enter a strong password",
            ],
        },
        firstName: {
            type: String,
            required: function () {
                return this.role === "User";
            },
        },
        lastName: {
            type: String,
            required: function () {
                return this.role === "User";
            },
        },
        country: {
            type: String,
            required: function () {
                return this.role === "User";
            },
        },
        city: {
            type: String,
            required: function () {
                return this.role === "User";
            },
        },
        district: {
            type: String,
            required: function () {
                return this.role === "User";
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        skills: {
            type: Array,
            maxlength: [10, "you cant have more than 10 skills"],
            required: function () {
                return this.role === "User";
            },
        },
        experience: [
            {
                position: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                startDate: {
                    type: Date,
                    required: true,
                },
                endDate: {
                    type: Date,
                },
            },
        ],
        interests: {
            type: Array,
            maxlength: [10, "you cant have more than 10 interests"],
            required: function () {
                return this.role === "User";
            },
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ["User", "Admin", "Organization"],
            default: "User",
        },
    },
    {
        collection: "Users",
        timestamps: true,
    }
);

UserSchema.plugin(mongoosePaginate);
const User = model("User", UserSchema);
export default User;
