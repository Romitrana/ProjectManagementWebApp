const express = require("express");
const {
  getAllTask,
  getSingleTask,
  createNewTask,
  removeTask,
  updateTask,
  getInfo,
} = require("../controllers/task");
const router = express.Router();
router.route("/info").get(getInfo);
router.route("/").get(getAllTask).post(createNewTask);
router
  .route("/:taskID")
  .get(getSingleTask)
  .put(updateTask)
  .delete(removeTask);

module.exports = router;
