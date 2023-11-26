const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DessertSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "No description provided.",
    },
    rating: {
      type: Number,
    },
  },
  { collection: "Desserts" }
);

module.exports = mongoose.model("Dessert", DessertSchema);
