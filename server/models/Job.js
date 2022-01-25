const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please provide comapny name"],
            maxlength: 40,
        },
        position: {
            type: String,
            required: [true, "Please provide company position"],
            maxlength: 30,
        },
        status: {
            type: String,
            enum: ["interview", "pending", "declined"],
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
