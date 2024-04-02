// import taskData from "./tasksData.js";
// //getAllTask
// export function getAllTask() {
//   if (taskData.length > 0) {
//     tasks.forEach((task) => {
//       console.log("taskID :", task.taskID);
//       console.log(
//         `task: ${task.task} \n duration: ${task.duration} \n status: ${task.status} \n teamID: ${task.teamID} \n projectHEAD: ${task.projectHEAD} \n completed: ${task.completed}`
//       );
//     });
//   } else {
//     console.log("No Records Found...!");
//   }
// }
// //getSingleTask
// export function getSingleTask(taskID) {
//   //   const tasks = loadTask();
//   const task = taskData.find((task) => task.taskID === taskID);
//   if (task) {
//     console.log("taskID :", task.taskID);
//     console.log(
//       `task: ${task.task} \n duration: ${task.duration} \n status: ${task.status} \n teamID: ${task.teamID} \n projectHEAD: ${task.projectHEAD} \n completed: ${task.completed}`
//     );
//   } else {
//     console.log("Task does not exist with respective ID...");
//   }
// }

// //create Task
// export function createNewTask({
//   taskID,
//   task,
//   duration,
//   status,
//   teamID,
//   projectHEAD,
//   completed,
// }) {
//   console.log("task create function exicuted");
//   console.log(taskData[0]);
//   const duplicateTask = taskData.filter((task) => task.taskID == taskID);
//   if (duplicateTask.length == 0) {
//     taskData.push({
//       taskID: taskID,
//       task: task,
//       duration: duration,
//       status: status,
//       teamID: teamID,
//       projectHEAD: projectHEAD,
//       completed: completed,
//     });
//     // saveTask(tasks);
//     console.log("----Task created successfully----");
//     alert("Task has been created...!");
//   } else {
//     console.log("---task id already allocated please provide unique ID---");
//   }
// }

// //remove task
// export function removeTask(taskID) {
//   //   const tasks = loadTask();
//   const taskToKeep = taskData.filter((task) => task.taskID !== taskID);
//   if (taskData.length > taskToKeep.length) {
//     console.log("Task has been removed successfully...!");
//     taskData = taskToKeep;
//   } else {
//     console.log("Task does not exist with respective ID...");
//   }
// }

// //specific task info

// export function getInfo(infoType, filter) {
//   //   const tasks = loadTask();
//   let filterTasks;
//   switch (infoType) {
//     case "duration": {
//       filterTasks = taskData.filter((task) => {
//         return task.duration.trim() === filter.trim();
//       });
//       if (filterTasks.length >= 1) {
//         filterTasks.forEach((task) => {
//           console.log(
//             `taskID:${task.taskID} \n task: ${task.task} \n duration: ${task.duration} \n status: ${task.status} \n teamID: ${task.teamID} \n projectHEAD: ${task.projectHEAD} \n completed: ${task.completed}`
//           );
//         });
//       } else {
//         console.log("No Task with such filter...!");
//       }
//       break;
//     }
//     case "status": {
//       filterTasks = taskData.filter((task) => {
//         return task.status === filter;
//       });
//       if (filterTasks.length >= 1) {
//         filterTasks.forEach((task) => {
//           console.log(
//             `taskID:${chalk.bgYellow(task.taskID)} \n task: ${
//               task.task
//             } \n duration: ${task.duration} \n status: ${
//               task.status
//             } \n teamID: ${task.teamID} \n projectHEAD: ${
//               task.projectHEAD
//             } \n completed: ${task.completed}`
//           );
//         });
//       } else {
//         console.log("No Task with such filter...!");
//       }
//       break;
//     }
//     case "completed": {
//       filterTasks = taskData.filter((task) => {
//         return task.completed === filter;
//       });
//       if (filterTasks.length >= 1) {
//         filterTasks.forEach((task) => {
//           console.log(
//             `taskID:${chalk.bgYellow(task.taskID)} \n task: ${
//               task.task
//             } \n duration: ${task.duration} \n status: ${
//               task.status
//             } \n teamID: ${task.teamID} \n projectHEAD: ${
//               task.projectHEAD
//             } \n completed: ${task.completed}`
//           );
//         });
//       } else {
//         console.log("No Task with such filter...!");
//       }
//       break;
//     }
//     case "teamID": {
//       filterTasks = taskData.filter((task) => {
//         return task.teamID === filter;
//       });
//       if (filterTasks.length > 0) {
//         filterTasks.forEach((task) => {
//           console.log(
//             `taskID:${chalk.bgYellow(task.taskID)} \n task: ${
//               task.task
//             } \n duration: ${task.duration} \n status: ${
//               task.status
//             } \n teamID: ${task.teamID} \n projectHEAD: ${
//               task.projectHEAD
//             } \n completed: ${task.completed}`
//           );
//         });
//       } else {
//         console.log("No tasks are present...!");
//       }
//       break;
//     }
//     default: {
//       console.log(
//         "Entered filteration parameter is wrong..please provide correct one"
//       );
//       break;
//     }
//   }
// }

// export function updateTask(taskID, property, updateData) {
//   //   const allTasks = loadTask();
//   const task = taskData.find((task) => task.taskID === taskID);
//   if (task) {
//     task[property] = updateData;
//     const updatedAllTask = taskData.filter((task) => task.taskID !== taskID);
//     updatedAllTask.push(task);
//     saveTask(updatedAllTask);
//     console.log("Task has been updated successfully...!");
//   } else {
//     console.log("Task does not exist with respective ID...");
//   }
// }

// //utility methods.
// // const saveTask = (task) => {
// //   const dataJSON = JSON.stringify(task);
// //   fs.writeFileSync("tasksData.json", dataJSON);
// // };

// // const loadTask = () => {
// //   try {
// //     const dataBuffer = fs.readFileSync("tasksData.json");
// //     const dataJSON = dataBuffer.toString();
// //     return JSON.parse(dataJSON);
// //   } catch (err) {
// //     console.error(err);
// //     return [];
// //   }
// // };

// // module.exports = {
// //   getAllTask,
// //   createNewTask,
// //   getSingleTask,
// //   removeTask,
// //   getInfo,
// //   updateTask,
// // };
