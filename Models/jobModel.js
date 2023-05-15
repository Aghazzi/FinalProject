import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const JobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        orgId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        description: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: [true, "Job's starDate is required"],
        },
        endDate: {
            type: String,
            required: [true, "Job's endDate is required"],
        },
        requiredSkills: {
            type: Array,
            maxlegnth: [10, "You can't have more than 10 required skills"],
        },
        status: {
            type: String,
            enum: ["open", "inProgress", "closed"],
            default: "open",
        },
        schedule: {
            type: String,
            required: [true, "Daily weekly or monthly schedule is required"],
        },
        nbOfVolunteers: {
            type: Number,
            required: true,
        },
        volunteers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        collection: "Jobs",
        timestamps: true,
    }
);

JobSchema.plugin(mongoosePaginate);
JobSchema.pre(["find", "findOne"], function () {
    this.populate("volunteers");
    this.populate("orgId");
});
const Job = model("Job", JobSchema);
export default Job;
