const { model, Schema } = require("mongoose");

const interestSchema = new Schema({
    internalName: String,
    displayName: String,
});

module.exports = model("Interest", interestSchema);