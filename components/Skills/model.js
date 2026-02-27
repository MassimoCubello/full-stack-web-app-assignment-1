import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  proficiency: String
});

const Skill = mongoose.model("Skill", SkillSchema);

async function getAllSkills() {
  return await Skill.find({});
}

async function getSkillById(id) {
  return await Skill.findById(id);
}

async function addSkill(name, category, proficiency) {
  let newSkill = new Skill({
    name,
    category,
    proficiency
  });
  return await newSkill.save();
}

async function updateSkill(id, name, category, proficiency) {
  return await Skill.findByIdAndUpdate(id, { name, category, proficiency }, { new: true });
}

async function deleteSkill(id) {
  return await Skill.findByIdAndDelete(id);
}

export default {
  getAllSkills,
  getSkillById,
  addSkill,
  updateSkill,
  deleteSkill
};
