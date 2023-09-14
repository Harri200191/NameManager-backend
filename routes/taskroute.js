const express = require("express");
const task_model = require("../model/task_model");

const {createTask, getTasks, getTask, getDataFromName, deleteTask, UpdateTask, UpdateTaskSingleField} = require("../controllers/taskcontroller");

const router = express.Router();

// ANOTHER WAY TO ADD ROUTES
/* router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).put(UpdateTask).patch(UpdateTaskSingleField); */

router.post("/", createTask);
//router.get("/", getTasks);
router.get("/:id", getTask);
router.get("/", getDataFromName)
router.delete("/:id", deleteTask);
router.put("/:id",  UpdateTask);
router.patch("/:id",  UpdateTaskSingleField);

module.exports = router;