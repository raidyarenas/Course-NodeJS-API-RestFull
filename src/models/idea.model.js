const mongoose = require("mongoose");
const { Schema } = mongoose;

const IdeaShema = new Schema({
    idea: { type: String, required: true },
    description: { type: String },
    upvotes: [{ type: Boolean }],
    downvotes: [{ type: Boolean }],
    autor: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment",
        required: true,
        autopopulate: true
    }]
});

IdeaShema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("idea", IdeaShema);
