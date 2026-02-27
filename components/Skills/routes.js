import express from "express";
const router = express.Router();

import skillController from "./controller.js";

router.get("/api/skills", skillController.listSkillsApi);
router.get("/admin/skills", skillController.listSkills);
router.get("/admin/skills/add", skillController.showAddSkill);
router.post("/admin/skills", skillController.addSkill);
router.get("/admin/skills/:id/edit", skillController.showEditSkill);
router.post("/admin/skills/:id", skillController.editSkill);
router.get("/admin/skills/:id/delete", skillController.deleteSkill);

export default router;
