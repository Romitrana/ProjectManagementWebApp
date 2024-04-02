//utility methods.
const fs = require("fs");

const saveTask = (task) => {
  const dataJSON = JSON.stringify(task);
  fs.writeFileSync("./tasksData.json", dataJSON);
  console.log("savetask")
};

const loadTask = () => {
  try {
    const dataBuffer = fs.readFileSync("./tasksData.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = { loadTask, saveTask };
