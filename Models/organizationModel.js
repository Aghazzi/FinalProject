import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";
import mongoosePaginate from "mongoose-paginate-v2";

const OrganizationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        description: {
            type: String,
        },
        website: {
            type: String,
        },
        location: [
            {
                country: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                district: {
                    type: String,
                    required: true,
                },
                street: {
                    type: String,
                    required: true,
                },
                branchName: {
                    type: String,
                    required: true,
                },
            },
        ],
        contactPersonName: {
            type: String,
            required: [true, "Contact Name is required"],
        },
        contactPersonPhone: {
            type: String,
            required: [true, "Contact Phone number is required"],
            validate: [validator.isMobilePhone, "please enter a valid Phone"],
        },
        contactPersonEmail: {
            type: String,
            required: [true, " Contact Email is required"],
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        newsResources: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
            },
        ],
        Job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
        },
    },
    {
        collection: "Organizations",
        timestamps: true,
    }
);

OrganizationSchema.plugin(mongoosePaginate);
OrganizationSchema.pre(["find", "findOne"], function () {
    this.populate("Job");
});
const Organization = model("Organization", OrganizationSchema);
export default Organization;
