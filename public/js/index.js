console.log("index.js file exicuted...");
const openClose = document.getElementById("open_close");
const tabE1 = document.getElementById("tab");
const filterE1 = document.getElementById("filter");
const createModel = document.getElementById("createTaskModel");
const closeModel = document.getElementById("closeTaskModel");
const closeSelectModel = document.getElementById("closeSelectTaskModel");
const createBtnE1 = document.getElementById("createBtn");
// form data
const taskidE1 = document.getElementById("taskID");
const taskE1 = document.getElementById("task");
const durationE1 = document.getElementById("duration");
const statusE1 = document.getElementById("status");
const teamidE1 = document.getElementById("teamID");
const projectHeadE1 = document.getElementById("projHead");
const completedE1 = document.getElementById("completed");
//form
const CreateTaskBtn = document.getElementById("submitTask");
//tasks
const taskContainer = document.getElementById("task-container");
const selectTask_model = document.getElementById("selected_task");
const selectedForm = document.getElementById("selectedtaskData");
const messageText = document.getElementById("message");

// message
const closeMessageE1 = document.getElementById("closeMessage");
const messageE1 = document.getElementById("messageBox");
const timelineE1 = document.getElementById("timeprogress");

//backlash
const backFall = document.getElementById("backlash");

// selected data

tabE1.addEventListener("click", () => {
  openClose.classList.toggle("fa-angle-right");
  openClose.classList.toggle("fa-angle-left");
  filterE1.classList.toggle("animationforward");
  filterE1.classList.toggle("animationbackward");
});

createBtnE1.addEventListener("click", () => {
  createModel.style.display = "block";
  backFall.style.display = "block";
});
closeModel.addEventListener("click", () => {
  createModel.style.display = "none";
  backFall.style.display = "none";
});
closeSelectModel.addEventListener("click", () => {
  selectTask_model.style.display = "none";
  backFall.style.display = "none";
});

// currents
let currentSelectedId;

//create task
CreateTaskBtn.addEventListener("click", () => {
  const data = {
    taskID: taskidE1.value,
    task: taskE1.value,
    duration: durationE1.value,
    status: statusE1.value,
    teamID: teamidE1.value,
    projectHEAD: projectHeadE1.value,
    completed: completedE1.value,
  };
  if (
    taskidE1.value &&
    taskE1.value &&
    durationE1.value &&
    statusE1.value &&
    teamidE1.value &&
    projectHeadE1.value &&
    completedE1.value <= 100
  ) {
    createTask(data);
    createModel.style.display = "none";
    backFall.style.display = "none";
  } else {
    showMessage(
      "Please fill all the input fields",
      "#fff",
      "#d63636",
      "#751212"
    );
  }

  document.getElementById("taskForm").reset();
});
//get All tasks
const fetchTasks = () => {
  axios
    .get("/taskManger/api/v1")
    .then((response) => {
      const data = response.data.data;
      displayTask(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
//displaying all tasks
function displayTask(data) {
  if (data.length == 0) {
    taskContainer.innerHTML = `<h2 style="color:#fff; letter-spacing:2px;font-family:monospace;">No Task Available</h2>`;
  } else {
    taskContainer.innerHTML = "";
    data.forEach((task) => {
      taskContainer.innerHTML += ` <div class="card" taskId=${task.taskID}>
    <div class="idies"> 
     <h5>Task ID : ${task.taskID}</h5>
     <h5>Team ID : ${task.teamID}</h5>
    </div>
    <div class="aboutTask"> 
      <h5>Description</h5>
    <p>${task.task}</p>
    </div>
    <div class="other"> 
     <div class="left">
      <h5>Deadline : ${task.duration}</h5>
      <h5>Status : <span>${task.status}</span></h5>
      <h5>Task Manager : ${task.projectHEAD}</h5>
     </div>
     <div class="right"> 
     <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--value:${task.completed}">
     </div>
     <p style="font-size:0.8rem; margin-top:0.4rem; font-family:monospace; color:#fff; text-align:center;">Completed</p>
     </div>
    </div>
    </div>`;
    });
    const tasks = document.querySelectorAll(".card");
    tasks.forEach((task) => {
      task.addEventListener("click", () => {
        const selectedId = task.getAttribute("taskId");
        selected_task(selectedId);
      });
    });
  }
}

fetchTasks();

// getSingleTask
function selected_task(taskId) {
  currentSelectedId = taskId;
  selectTask_model.style.display = "block";
  backFall.style.display = "block";
  axios
    .get(`taskManger/api/v1/${taskId}`)
    .then((response) => {
      const singledata = response.data.task;
      // selectedForm.innerHTML = "";
      selectedForm.innerHTML = `<label for="taskID">TaskID</label><br>
      <input type="text" id="selecttaskID" placeholder="TK_05" value="${singledata.taskID}" required><br>
      <label for="task">Task</label><br>
      <input type="text" id="selecttask" placeholder="fix the bugs in create user feature" value="${singledata.task}" required><br>
      <label for="duration">Duration</label><br>
      <input type="text" id="selectduration" placeholder="12 weeks" value="${singledata.duration}" required><br>
      <label for="status">Status</label><br>
      <input type="text" id="selectstatus" placeholder="pending" value="${singledata.status}" required><br>
      <label for="teamID">TeamID</label><br>
      <input type="text" id="selectteamID" placeholder="T202" value="${singledata.teamID}" required><br>
      <label for="projHead">ProjectHead</label><br>
      <input type="text" id="selectprojHead" placeholder="shubham kumar" value="${singledata.projectHEAD}" required><br>
      <label for="completed">Completed</label><br>
      <input type="number" id="selectcompleted" placeholder="75%" value=${singledata.completed} required><br>
      <div class="buttons"> 
      <button id="updateTask">Update</button>
      <button id="deleteTask">Delete</button>
      </div>
     `;
      const updateTaskE1 = document.getElementById("updateTask");
      const deleteTaskE1 = document.getElementById("deleteTask");
      updateTaskE1.addEventListener("click", updateTask);
      deleteTaskE1.addEventListener("click", deleteTask);
    })
    .catch((error) => {
      showMessage(
        "Something Went Wrong, Please try again Later",
        "#333",
        "#dbb91f",
        "#d68c0b"
      );
    });
}

// updateTask
function updateTask(event) {
  event.preventDefault();
  console.log(currentSelectedId);
  console.log("update exicuted");
  //getting update data;
  let updatedata = {
    taskID: document.getElementById("selecttaskID").value,
    task: document.getElementById("selecttask").value,
    duration: document.getElementById("selectduration").value,
    status: document.getElementById("selectstatus").value,
    teamID: document.getElementById("selectteamID").value,
    projectHEAD: document.getElementById("selectprojHead").value,
    completed: document.getElementById("selectcompleted").value,
  };
  if (
    updatedata.taskID &&
    updatedata.task &&
    updatedata.duration &&
    updatedata.status &&
    updatedata.teamID &&
    updatedata.projectHEAD &&
    updatedata.completed <= 100
  ) {
    console.log("updating data", updatedata);
    axios
      .put(`/taskManger/api/v1/${currentSelectedId}`, updatedata)
      .then((response) => {
        console.log("response :", response);
        showMessage(
          "Task has been Updated Successfully",
          "#fff",
          "#28A745",
          "#269129"
        );
        selectedForm.reset();
        selectTask_model.style.display = "none";
        backFall.style.display = "none";
        fetchTasks();
      })
      .catch((error) => {
        console.log(error);
        showMessage(
          "Something Went Wrong, Please try again Later",
          "#333",
          "#dbb91f",
          "#d68c0b"
        );
      });
  } else {
    showMessage(
      "Please fill all the input fields",
      "#fff",
      "#d63636",
      "#751212"
    );
  }
}

//delete task
function deleteTask(event) {
  console.log("delete exicuted");
  event.preventDefault();
  axios
    .delete(`/taskManger/api/v1/${currentSelectedId}`)
    .then((response) => {
      showMessage(
        "Task has been deleted Successfully",
        "#fff",
        "#28A745",
        "#269129"
      );
      selectedForm.reset();
      selectTask_model.style.display = "none";
      backFall.style.display = "none";
      fetchTasks();
    })
    .catch((error) => {
      showMessage(
        "Something Went Wrong, Please try again Later",
        "#333",
        "#dbb91f",
        "#d68c0b"
      );
    });
}

// createTask

function createTask(Taskdata) {
  axios
    .post("/taskManger/api/v1", Taskdata)
    .then((response) => {
      if (response.status == 200) {
        showMessage(
          "Task Created Successfully...",
          "#fff",
          "#28A745",
          "#269129"
        );
        fetchTasks();
      }
    })
    .catch((error) => {
      showMessage("Please provide unique TaskID", "#fff", "#d63636", "#751212");
    });
}

// notification message
let stoptimer;
function showMessage(textMessage, txtColor, bgColor, bordercol) {
  messageE1.className = "";
  messageE1.style.color = txtColor;
  messageText.textContent = textMessage;
  messageE1.style.background = bgColor;
  messageE1.style.borderColor = bordercol;
  messageE1.classList.add("showMessage");
  timelineE1.classList.add("timeline");
  stoptimer = setTimeout(() => {
    messageE1.className = "";
    messageE1.classList.add("hideMessage");
    timelineE1.classList.remove("timeline");
  }, 5000);
}

closeMessageE1.addEventListener("click", () => {
  messageE1.className = "";
  clearTimeout(stoptimer);
  messageE1.classList.add("hideMessage");
  timelineE1.classList.remove("timeline");
});
