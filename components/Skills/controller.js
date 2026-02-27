import skillModel from "./model.js";

const listSkills = async (request, response) => {
  let skills = await skillModel.getAllSkills();
  response.render("admin/skills", { skills });
};

const listSkillsApi = async (request, response) => {
  let skills = await skillModel.getAllSkills();
  response.json(skills);
};

const showAddSkill = (request, response) => {
  response.render("admin/addSkill");
};

const addSkill = async (request, response) => {
  let { name, category, proficiency } = request.body;
  await skillModel.addSkill(name, category, proficiency);
  response.redirect("/admin/skills");
};

const showEditSkill = async (request, response) => {
  let skill = await skillModel.getSkillById(request.params.id);
  response.render("admin/editSkill", { skill });
};

const editSkill = async (request, response) => {
  let { name, category, proficiency } = request.body;
  await skillModel.updateSkill(request.params.id, name, category, proficiency);
  response.redirect("/admin/skills");
};

const deleteSkill = async (request, response) => {
  await skillModel.deleteSkill(request.params.id);
  response.redirect("/admin/skills");
};

export default {
  listSkills,
  listSkillsApi,
  showAddSkill,
  addSkill,
  showEditSkill,
  editSkill,
  deleteSkill
};
