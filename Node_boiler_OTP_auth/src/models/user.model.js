const { model, Schema } = require("mongoose");

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        email: String,
        gender: String,
        dob: String,
        profession: String,
        city: String,
        country: String,

        deviceInfo: Schema.Types.Mixed,
        interests: [Schema.Types.Mixed],
        photoURL: String,

        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },

        otp: String,
        isValidated: Boolean,
    },
    { timestamps: true }
);

module.exports = model("User", userSchema);
