const mongoose = require('mongoose');
const PageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
            default: "Untitled",
        },

        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },

)

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;