import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  languages: String,
  technologies: String,
  link: String
});

const Project = mongoose.model("Project", ProjectSchema);

async function getAllProjects() {
  return await Project.find({});
}

async function getProjectById(id) {
  return await Project.findById(id);
}

async function addProject(title, description, languages, technologies, link) {
  let newProject = new Project({
    title,
    description,
    languages,
    technologies,
    link
  });
  return await newProject.save();
}

async function updateProject(id, title, description, languages, technologies, link) {
  return await Project.findByIdAndUpdate(id, { title, description, languages, technologies, link }, { new: true });
}

async function deleteProject(id) {
  return await Project.findByIdAndDelete(id);
}

export default {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
};
