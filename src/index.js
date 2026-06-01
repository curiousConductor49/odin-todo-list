// imports
import "./styles.css";
import initlocalStorageData from "./onPageLoad.js";
import * as dynamicHTMLPopulator from "./utility/dynamicHtmlPopulation.js";
import * as todoDataDisplayer from "./utility/displayTodoDataFromStorage.js";
import * as formEvents from "./event-logic/form-events.js";
import * as dataDisplayEvents from "./event-logic/data-display-events.js"


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
const singleTodoListDisplay = document.querySelector("#single-todo-list-display");
const displays = [todoItemsDisplay, todoListsDisplay, singleTodoListDisplay];

// container for forms to enter todo data
const formDialog = document.querySelector("#form-dialog");
const createNewTodoDataForm = document.querySelector("#create-new");
const updateExistingTodoDataForm = document.querySelector("#update-existing");

// upon complete page load, initialize app data and populate the todo list dropdown based on app data
window.addEventListener("load", initlocalStorageData);
window.addEventListener("load", () => todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown());

// creating new todo data
newItemBtn.addEventListener("click", () => {
    // toggle visibility of create-new form and open dialog
    createNewTodoDataForm.classList.toggle("hide");
    formDialog.showModal();

    // populate form
    createNewTodoDataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoItemFormFields();

    // handle using form
    formEvents.handleTodoItemData(formDialog, createNewTodoDataForm, todoItemsDisplay);

    // handle closing form
    formEvents.closeForm(formDialog, createNewTodoDataForm);
});

newListBtn.addEventListener("click", () => {
    // toggle visibility of create-new form and open dialog
    createNewTodoDataForm.classList.toggle("hide");
    formDialog.showModal();

    // populate form
    createNewTodoDataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoListFormFields();

    // handle using form
    formEvents.handleTodoListData(formDialog, createNewTodoDataForm, todoListsDisplay);
    
    // handle closing form
    formEvents.closeForm(formDialog, createNewTodoDataForm);
});

// utilize event delegation for individual todo item logic (viewing, updating, deleting)
todoItemsDisplay.addEventListener("click", (event) => dataDisplayEvents.handleUpdatingTodoItem(formDialog, updateExistingTodoDataForm, todoItemsDisplay, event));

// utilize event delegation for individual todo list logic (viewing, updating, deleting)
todoListsDisplay.addEventListener("click", (event) => dataDisplayEvents.handleUpdatingTodoList(formDialog, updateExistingTodoDataForm, todoListsDisplay, event));

// utilize event delegation for selected todo list logic (viewing, updating, deleting)
singleTodoListDisplay.addEventListener("click", (event) => dataDisplayEvents.handleUpdatingSelectedTodoList(formDialog, updateExistingTodoDataForm, singleTodoListDisplay, event));

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
    todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();
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
    todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();
});

todoListDropdown.addEventListener("change", (event) => {
    // hide other displays
    displays.forEach(display => {
        if (display.id === "single-todo-list-display" && [...display.classList].includes("hide")) {
            display.classList.remove("hide");
        } else if (display.id !== "single-todo-list-display") {
            display.classList.add("hide");
        }
    })

    // show list and todo items within list
    singleTodoListDisplay.innerHTML = todoDataDisplayer.createSelectedTodoListElement(event.target);
});