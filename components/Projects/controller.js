import projectModel from "./model.js";

const listProjects = async (request, response) => {
  let projects = await projectModel.getAllProjects();
  response.render("admin/projects", { projects });
};

const listProjectsApi = async (request, response) => {
  let projects = await projectModel.getAllProjects();
  response.json(projects);
};

const showAddProject = (request, response) => {
  response.render("admin/addProject");
};

const addProject = async (request, response) => {
  let { title, description, languages, technologies, link } = request.body;
  await projectModel.addProject(title, description, languages, technologies, link);
  response.redirect("/admin/projects");
};

const showEditProject = async (request, response) => {
  let project = await projectModel.getProjectById(request.params.id);
  response.render("admin/editProject", { project });
};

const editProject = async (request, response) => {
  let { title, description, languages, technologies, link } = request.body;
  await projectModel.updateProject(request.params.id, title, description, languages, technologies, link);
  response.redirect("/admin/projects");
};

const deleteProject = async (request, response) => {
  await projectModel.deleteProject(request.params.id);
  response.redirect("/admin/projects");
};

export default {
  listProjects,
  listProjectsApi,
  showAddProject,
  addProject,
  showEditProject,
  editProject,
  deleteProject
};
