// imports
import "./styles.css";
import initlocalStorageData from "./onPageLoad.js";
import * as dynamicHTMLPopulator from "./utility/dynamicHtmlPopulation.js";
import * as todoDataDisplayer from "./utility/displayTodoDataFromStorage.js";
import * as formEvents from "./event-logic/form-events.js";
import * as dataDisplayEvents from "./event-logic/data-display-events.js"
import toggleDisplays from "./utility/toggleDisplays.js";


// DOM elements
// container for options to create todo data
const newItemBtn = document.querySelector("#new-item-btn");
const newListBtn = document.querySelector("#new-list-btn");

// container for options to view todo data
const allItemsBtn = document.querySelector("#all-items-btn");
const allListsBtn = document.querySelector("#all-lists-btn");
const todoListDropdown = document.querySelector("#todo-list-dropdown");

// containers to display todo data
const dataDisplay = document.querySelector("#data-display");
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
    // toggle visibility of data-display container and create-new form
    toggleDisplays(todoListsDisplay, createNewTodoDataForm);

    // populate form
    createNewTodoDataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoListFormFields();
    // handle using form
    formEvents.handleTodoListData(createNewTodoDataForm, todoListsDisplay);
    
    // handle closing form
    formEvents.closeForm(createNewTodoDataForm, todoListsDisplay);
});

// set event listener to utilize event delegation for individual todo item logic (viewing, updating, deleting)
dataDisplayEvents.handleTodoItemDisplay(updateExistingTodoDataForm, todoItemsDisplay);

// set event listener to utilize event delegation for individual todo list logic (viewing, updating, deleting)
dataDisplayEvents.handleTodoListDisplay(updateExistingTodoDataForm, todoListsDisplay);

// set event listener to utilize event delegation for single todo list logic (viewing, updating, deleting) 
dataDisplayEvents.handleSingleTodoListDisplay(updateExistingTodoDataForm, singleTodoListDisplay);

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