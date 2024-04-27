//keep track of tasks created and use for ID.
let noteId = 1;

//////////****** BUTTON FUNCTIONS ******////////////
//ADD TASK
const addNote = () => {
  //store input value
  let input = document.querySelector("#myInput").value;
  //grab the notes display where notes will populate from DOM
  let display = document.querySelector("#notes_display");
  //add note with the value of input to the DOM.
  display.insertAdjacentHTML(
    "beforeend",
    ` <!-- Individual Note -->
    <li class="noteContainer" id="${noteId}">
        <div class="note_status_container">
            <div class="note_status">
                <div class="btn-group"  role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" onclick="statusTodo(btnradio1_${noteId})" name="btnradio${noteId}" id="btnradio1_${noteId}"
                    autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1_${noteId}">To Do</label>

                <input type="radio" class="btn-check" name="btnradio${noteId}" id="btnradio2_${noteId}"
                    autocomplete="off">
                <label class="btn btn-outline-success" for="btnradio2_${noteId}">Doing</label>

                <input type="radio" class="btn-check" onclick="statusDone(btnradio3_${noteId})" name="btnradio${noteId}" id="btnradio3_${noteId}"
                    autocomplete="off">
                <label class="btn btn-outline-danger" for="btnradio3_${noteId}">Done</label>
                </div>
            </div>
            <div class="note">
                <input class="form-control" type="text" value="${input}" readonly>
            </div>
        </div>
        <div class="note_control_btns">
            <i class="edit" id="edit_btn" onclick="editFunc(${noteId})"><img src="assets/edit.png" alt="edit button">
            </i>
            <i class="delete" id="delete_btn" onclick="deleteFunc()"><img src="assets/bin.png" alt="delete button">
            </i>
        </div>
    </li>
    <!-- Individual Note END-->`
  );
  //clear the input
  document.querySelector("#myInput").value = "";
  //increment the id
  noteId++;
};

//DELETE TASK
const deleteFunc = () => {
  const deleteButton = document.getElementById("delete_btn");
  let selectedNote = deleteButton.parentElement.parentElement;
  selectedNote.remove();
};

//SAVE TASK(only available after edit task invoked)
const saveFunc = (id) => {
  const saveButton = document.getElementById(id);
  let note = saveButton.querySelector(".form-control");
  note.setAttribute("readonly", "");
  let editBtn = `<i class="edit" id="edit_btn" onclick="editFunc(${id})"><img src="assets/edit.png" alt="save button">
  </i>`;
  saveButton.querySelector(".save").outerHTML = editBtn;
};

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
