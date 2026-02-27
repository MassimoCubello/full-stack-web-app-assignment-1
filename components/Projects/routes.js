import express from "express";
const router = express.Router();

import projectController from "./controller.js";

router.get("/api/projects", projectController.listProjectsApi);
router.get("/admin/projects", projectController.listProjects);
router.get("/admin/projects/add", projectController.showAddProject);
router.post("/admin/projects", projectController.addProject);
router.get("/admin/projects/:id/edit", projectController.showEditProject);
router.post("/admin/projects/:id", projectController.editProject);
router.get("/admin/projects/:id/delete", projectController.deleteProject);

export default router;
