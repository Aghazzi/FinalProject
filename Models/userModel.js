import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema(
    {
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
            select: false,
        },
        country: {
            type: String,
            required: [true, "country is required"],
        },
        city: {
            type: String,
        },
        firstName: {
            type: String,
            required: function () {
                return this.role === "User" || this.role === "Admin";
            },
        },
        lastName: {
            type: String,
            required: function () {
                return this.role === "User" || this.role === "Admin";
            },
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
        orgName: {
            type: String,
            required: function () {
                return this.role === "Org";
            },
        },
        contactPersonName: {
            type: String,
            required: function () {
                return this.role === "Org";
            },
        },
        contactPersonPhone: {
            type: String,
            required: function () {
                return this.role === "Org";
            },
            validate: [validator.isMobilePhone, "please enter a valid Phone"],
        },
        contactPersonEmail: {
            type: String,
            required: function () {
                return this.role === "Org";
            },
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        newsResources: {
            type: [
                {
                    title: {
                        type: String,
                        required: function () {
                            return this.role === "Org";
                        },
                    },
                    description: {
                        type: String,
                        required: function () {
                            return this.role === "Org";
                        },
                    },
                    content: {
                        type: String,
                        required: function () {
                            return this.role === "Org";
                        },
                    },
                },
            ],
            validate: {
                validator: function (value) {
                    if (this.role === "Org") {
                        return value && value.length > 0;
                    }
                    return true;
                },
                message: "News resources are required for Organizations.",
            },
        },
        appliedJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
        description: {
            type: String,
        },
        website: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ["User", "Admin", "Org"],
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
