const { loadTask, saveTask } = require("../utilities/task.js");

//getAllTasks ---> done
const getAllTask = async (req, res) => {
  const tasks = await loadTask();
  if (tasks.length > 0) {
    res.status(200).json({ msg: "tasks fetched successfully...", data: tasks });
  } else {
    res.status(200).json({ msg: "No Task Available", data: tasks });
  }
};

//getSingleTask ---> done
const getSingleTask = async (req, res) => {
  const { taskID } = req.params;
  const tasks = await loadTask();
  const task = tasks.find((task) => task.taskID === taskID);
  if (task) {
    res.status(200).json({ msg: "single task", task: task });
  } else {
    res.status(400).json({ msg: "No Task Available with this ID" });
  }
};

//createTask  ---> done
const createNewTask = async (req, res) => {
  const { taskID, task, duration, status, teamID, projectHEAD, completed } =
    req.body;
  const tasks = await loadTask();
  const duplicateTask = tasks.filter((task) => task.taskID == taskID);
  if (duplicateTask.length == 0) {
    tasks.push({
      taskID: taskID,
      task: task,
      duration: duration,
      status: status,
      teamID: teamID,
      projectHEAD: projectHEAD,
      completed: completed,
    });
    saveTask(tasks);
    res.status(200).json({ msg: "Task Created Successfully" });
  } else {
    res.status(400).json({ msg: "Please provide Unique taskID" });
  }
};

//remove task  ---> done
const removeTask = async (req, res) => {
  const { taskID } = req.params;
  const tasks = await loadTask();
  const taskToKeep = tasks.filter((task) => task.taskID !== taskID);
  if (tasks.length > taskToKeep.length) {
    saveTask(taskToKeep);
    res.status(200).json({ msg: "task has been deleted successfully" });
  } else {
    res.status(400).json({ msg: "No Task Available with this ID" });
  }
};

//update task  ---> done
const updateTask = async (req, res) => {
  const { taskID } = req.params;
  const  updateData  = req.body;
  const allTasks = await loadTask();
  const task = allTasks.find((task) => task.taskID === taskID);
  if (task) {
    // task[property] = updateData;
    const updatedAllTask = allTasks.filter((task) => task.taskID !== taskID);
    updatedAllTask.push(updateData);
    saveTask(updatedAllTask);
    res.status(200).json({ msg: "Task Updated successfully" });
  } else {
    res.status(400).json({ msg: "No Task Available with this ID" });
  }
};

//   specific info  ---> done 
// duration  | status  | completed | teamID
const getInfo = async (req, res) => {
  console.log(req.query);
  const { infoType, filter } = req.query;
  const tasks = await loadTask();
  let filterTasks;
  switch (infoType) {
    case "duration": {
      filterTasks = tasks.filter((task) => {
        return task.duration.trim() === filter.trim();
      });
      if (filterTasks.length >= 1) {
        res
          .status(200)
          .json({ msg: "task fetched successfully", tasks: filterTasks });
      } else {
        res.status(400).json({ msg: "No task with such filter" });
      }
      break;
    }
    case "status": {
      filterTasks = tasks.filter((task) => {
        return task.status.trim() === filter.trim();
      });
      if (filterTasks.length >= 1) {
        res
          .status(200)
          .json({ msg: "task fetched successfully", task: filterTasks });
      } else {
        res.status(400).json({ msg: "No task with such filter" });
      }
      break;
    }
    case "completed": {
      filterTasks = tasks.filter((task) => {
        return task.completed === filter;
      });
      if (filterTasks.length >= 1) {
        res
          .status(200)
          .json({ msg: "task fetched successfully", task: filterTasks });
      } else {
        res.status(400).json({ msg: "No task with such filter" });
      }
      break;
    }
    case "teamID": {
      filterTasks = tasks.filter((task) => {
        return task.teamID === filter;
      });
      if (filterTasks.length > 0) {
        res
          .status(200)
          .json({ msg: "task fetched successfully", task: filterTasks });
      } else {
        res.status(400).json({ msg: "No task with such filter" });
      }
      break;
    }
    default: {
      res.status(400).json({
        msg: "Entered filteration parameter is wrong..please provide correct one",
      });
      break;
    }
  }
};


//exports
module.exports = {
  getAllTask,
  getSingleTask,
  createNewTask,
  removeTask,
  updateTask,
  getInfo,
};
