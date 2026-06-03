// imports
import "./styles.css";
import initlocalStorageData from "./onPageLoad.js";
import * as dynamicFormPopulator from "./utility/dynamic-form-population.js";
import populateTodoListDropdown from "./utility/dynamic-selection-population.js";
import * as todoDataDisplayer from "./utility/display-todo-data.js";
import * as formInteractions from "./interaction-logic/form-interactions.js";
import * as todoDataInteractions from "./interaction-logic/todo-data-interactions.js"


// DOM elements
// container for options to create todo data
const newItemBtn = document.querySelector("#new-item-btn");
const newListBtn = document.querySelector("#new-list-btn");

// container for options to view todo data
const allItemsBtn = document.querySelector("#all-items-btn");
const allListsBtn = document.querySelector("#all-lists-btn");
const todoListDropdown = document.querySelector("#todo-list-dropdown");

// containers to display todo data
const todoItemsDisplay = document.querySelector("#todo-items-display");
const todoListsDisplay = document.querySelector("#todo-lists-display");
const selectedTodoListDisplay = document.querySelector("#selected-todo-list-display");
const displays = [todoItemsDisplay, todoListsDisplay, selectedTodoListDisplay];

// forms to create and update todo data
const formDialog = document.querySelector("#form-dialog");
const formToCreateTodoData = document.querySelector("#create-new");
const formToUpdateTodoData = document.querySelector("#update-existing");

// upon complete page load, initialize app data and populate the todo list dropdown based on app data
window.addEventListener("load", initlocalStorageData);
window.addEventListener("load", () => todoListDropdown.innerHTML = populateTodoListDropdown());

// creating new todo data
newItemBtn.addEventListener("click", () => {
    // toggle visibility of create-new form and open dialog
    formToCreateTodoData.classList.toggle("hide");
    formDialog.showModal();

    // populate form
    formToCreateTodoData.innerHTML = dynamicFormPopulator.populateNewTodoItemFormFields();

    // handle using form
    formInteractions.handleTodoItemData(formDialog, formToCreateTodoData, todoItemsDisplay);

    // handle closing form
    formInteractions.closeForm(formDialog, formToCreateTodoData);
});

newListBtn.addEventListener("click", () => {
    // toggle visibility of create-new form and open dialog
    formToCreateTodoData.classList.toggle("hide");
    formDialog.showModal();

    // populate form
    formToCreateTodoData.innerHTML = dynamicFormPopulator.populateNewTodoListFormFields();

    // handle using form
    formInteractions.handleTodoListData(formDialog, formToCreateTodoData, todoListsDisplay);
    
    // handle closing form
    formInteractions.closeForm(formDialog, formToCreateTodoData);
});

// utilize event delegation for individual todo item logic (viewing, updating, deleting)
todoItemsDisplay.addEventListener("click", (event) => todoDataInteractions.handleUpdatingTodoItem(formDialog, formToUpdateTodoData, todoItemsDisplay, event));

// utilize event delegation for individual todo list logic (viewing, updating, deleting)
todoListsDisplay.addEventListener("click", (event) => todoDataInteractions.handleUpdatingTodoList(formDialog, formToUpdateTodoData, todoListsDisplay, todoListDropdown, event));

// utilize event delegation for selected todo list logic (viewing, updating, deleting)
selectedTodoListDisplay.addEventListener("click", (event) => todoDataInteractions.handleUpdatingSelectedTodoList(formDialog, formToUpdateTodoData, selectedTodoListDisplay, todoListDropdown, event));

// dynamically populate displays with todo data
allItemsBtn.addEventListener("click", () => {
    // hide other displays
    displays.forEach(display => {
        if (display.id === "todo-items-display" && [...display.classList].includes("hide")) {
            display.classList.remove("hide");
        } else if (display.id !== "todo-items-display") {
            display.classList.add("hide");
        }
    })
    // show all todo items
    todoItemsDisplay.innerHTML = todoDataDisplayer.createAllTodoItemElements();
    // refresh options for specific todo list selection
    todoListDropdown.innerHTML = populateTodoListDropdown();
});

allListsBtn.addEventListener("click", () => {
    // hide other displays
    displays.forEach(display => {
        if (display.id === "todo-lists-display" && [...display.classList].includes("hide")) {
            display.classList.remove("hide");
        } else if (display.id !== "todo-lists-display") {
            display.classList.add("hide");
        }
    })
    // show all todo lists
    todoListsDisplay.innerHTML = todoDataDisplayer.createAllTodoListElements();
    // refresh options for specific todo list selection
    todoListDropdown.innerHTML = populateTodoListDropdown();
});

todoListDropdown.addEventListener("change", (event) => {
    // hide other displays
    displays.forEach(display => {
        if (display.id === "selected-todo-list-display" && [...display.classList].includes("hide")) {
            display.classList.remove("hide");
        } else if (display.id !== "selected-todo-list-display") {
            display.classList.add("hide");
        }
    })

    // show list and todo items within list
    selectedTodoListDisplay.innerHTML = todoDataDisplayer.createSelectedTodoListElement(event.target);
});