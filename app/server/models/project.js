const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    name: { type: String, requried: true },
    abstract: { type: String, requried: true },
    authors: { type: [{ type: String }], requried: true, unique: true },
    tags: { type: [{ type: String }] },
    createdBy: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

const Projects = mongoose.model("projects", ProjectSchema);

module.exports = Projects;
