// Function to initialize the app
const init = () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from local storage or initialize an empty array
  loadNotes(); // Render tasks onto the DOM
};

// Call init() when the page loads to initialize the app
document.addEventListener("DOMContentLoaded", init);

const loadNotes = () => {
  // Clear existing notes from display
  document.querySelector("#notes_display").innerHTML = "";
  // Render notes from tasks array
  tasks.forEach((task, index) => {
    let display = document.querySelector("#notes_display");
    const html = ` <!-- Individual Note -->
    <li class="noteContainer" id="${index}">
        <div class="note_status_container">
            <div class="note_status">
                <div class="btn-group"  role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" onclick="statusTodo(btnradio1_${index})" name="btnradio${index}" id="btnradio1_${index}"
                    autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1_${index}">To Do</label>
  
                <input type="radio" class="btn-check" name="btnradio${index}" id="btnradio2_${index}"
                    autocomplete="off">
                <label class="btn btn-outline-success" for="btnradio2_${index}">Doing</label>
  
                <input type="radio" class="btn-check" onclick="statusDone(btnradio3_${index})" name="btnradio${index}" id="btnradio3_${index}"
                    autocomplete="off">
                <label class="btn btn-outline-danger" for="btnradio3_${index}">Done</label>
                </div>
            </div>
            <div class="note">
                <input class="form-control" type="text" value="${task}" readonly>
            </div>
        </div>
        <div class="note_control_btns">
            <i class="edit" id="edit_btn" onclick="editFunc(${index})"><img src="assets/edit.png" alt="edit button">
            </i>
            <i class="delete" id="delete_btn" onclick="deleteFunc(${index})"><img src="assets/bin.png" alt="delete button">
            </i>
        </div>
    </li>
    <!-- Individual Note END-->`;
    display.insertAdjacentHTML("beforeend", html);
  });
};

const addNote = () => {
  let input = document.querySelector("#myInput").value;
  tasks.push(input);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.querySelector("#myInput").value = "";
  loadNotes(); // Re-render notes
};

const deleteFunc = (id) => {
  tasks.splice(id, 1); // Remove the task from the tasks array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  loadNotes(); // Re-render notes
};

const saveFunc = (id) => {
  const note = document.getElementById(id).querySelector(".form-control").value;
  tasks[id] = note; // Update the task in the tasks array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  loadNotes(); // Re-render notes
};

// EDIT task and other functions remain unchanged

//EDIT task
const editFunc = (id) => {
  const editButton = document.getElementById(id);
  let note = editButton.querySelector(".form-control");
  note.removeAttribute("readonly");
  note.value = "";
  note.focus();
  let saveBtn = `<i class="save" id="save_btn" onclick="saveFunc(${id})"><img src="assets/diskette.png" alt="save button">
        </i>`;
  editButton.querySelector(".edit").outerHTML = saveBtn;
  console.log(editButton.querySelector(".edit"));
};

//note specific function to toggle status
//-default set to "todo"
const statusTodo = (id) => {
  let input =
    id.parentElement.parentElement.parentElement.querySelector(".note");
  input.style.textDecoration = "none";
  input.style.textDecorationColor = "none";
};
//-"doing" status alters background color of note
//-"done" creates line-through task and causes delete to shake on interval
const statusDone = (id) => {
  let input =
    id.parentElement.parentElement.parentElement.querySelector(".note");
  input.style.textDecoration = "line-through";
  input.style.textDecorationColor = "red";
};
