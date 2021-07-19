const Projects = require("../models/project");
const helper = require("../models/mongo_helper");

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    const project = new Projects({
      name: name,
      abstract: abstract,
      authors: authors,
      tags: tags,
      createdBy: createdBy,
    });

    if (await project.save()) {
      return [true, project];
    }
  } catch (err) {
    return [false, helper.translateError(err)];
  }
};

/* Return project with specified id */
const getById = async (id) => {
  return await Projects.findOne({ _id: id });
};

/* Return all projects */
const getAll = async () => {
  return await Projects.find();
};

module.exports = {
  getAll,
  create,
  getById,
};
