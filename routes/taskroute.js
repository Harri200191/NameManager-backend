const express = require("express");
const task_model = require("../model/task_model");
const {checkDatabaseCleared} = require("../middlewares/TrackDeletion");

const {createTask, getTasks, getTask, getDataFromName, deleteTask, UpdateTask, UpdateTaskSingleField, ClearDB} = require("../controllers/taskcontroller");

const router = express.Router();
  
router.post("/", createTask);
router.get("/create-database", checkDatabaseCleared, ClearDB);
router.get("/:id", getTask);
router.get("/", getDataFromName)
router.delete("/:id", deleteTask);
router.put("/:id",  UpdateTask);
router.patch("/:id",  UpdateTaskSingleField);

module.exports = router;