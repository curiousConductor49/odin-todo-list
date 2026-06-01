import * as formEvents from "../event-logic/form-events.js";
import * as dynamicHTMLPopulator from "../utility/dynamicHtmlPopulation.js";
import * as displayTodoDataFromStorage from "../utility/displayTodoDataFromStorage.js"
import deleteTodoItemFromStorage from "../crud-ops/deleteTodoItemFromStorage.js";
import deleteTodoListFromStorage from "../crud-ops/deleteTodoListFromStorage.js";

// helper functions for updating todo items and todo lists
function handleUpdatingTodoItem(formDialog, dataForm, dataDisplay, event) {
    // get the todo item element
    const todoItem = event.target.closest(".todo-item");
    const todoItemId = todoItem.dataset.id;
    
    // conditional logic based on which button of the todo item element was clicked
    if ([...event.target.classList].includes("update-item-btn")) {
        // set innerHTML of form
        dataForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoItemFormFields(todoItemId);

        // toggle form visibility and open modal
        dataForm.classList.toggle("hide");
        formDialog.showModal();

        // handle form submission and closing
        formEvents.handleTodoItemData(formDialog, dataForm, dataDisplay, todoItemId);
        formEvents.closeForm(formDialog, dataForm);

        // update dom element
        const submitFormBtn = dataForm.querySelector("#submit-form-btn");
        submitFormBtn.addEventListener("click", () => {
            try {
                const appData = JSON.parse(localStorage.getItem("todoAppData"));
                const todoItems = appData["todoItems"];
                const todoItemData = todoItems.find(item => item.id === todoItemId);
                displayTodoDataFromStorage.updateTodoItemElement(todoItem, todoItemData);
            } catch (error) {
                console.log("Error:", error);
            }
        })
    } else if ([...event.target.classList].includes("delete-item-btn")) {
        // close modal and toggle form visibility
        formDialog.close();
        dataForm.classList.toggle("hide");

        // remove todo item from storage and dom
        deleteTodoItemFromStorage(todoItem);
        todoItem.remove();
    }
}

function handleUpdatingTodoList(formDialog, dataForm, dataDisplay, event) {
    // get the todo list element
    const todoList = event.target.closest(".todo-list");
    const todoListId = todoList.dataset.id;

    // conditional logic based on which button of the todo list element was clicked
    if ([...event.target.classList].includes("update-list-btn")) {
        // set innerHTML of form
        dataForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoListFormFields(todoListId);

        // toggle form visibility and open modal
        dataForm.classList.toggle("hide");
        formDialog.showModal();

        // handle form submission (for either all todo lists or a single todo list displayed from the selection dropdown)
        todoList.parentElement.id === "single-todo-list-display" ? formEvents.handleSingleTodoListData(formDialog, dataForm, todoListId) : formEvents.handleTodoListData(formDialog, dataForm, dataDisplay, todoListId);

        // handle form closing
        formEvents.closeForm(formDialog, dataForm);

        // update dom element
        const submitFormBtn = dataForm.querySelector("#submit-form-btn");
        submitFormBtn.addEventListener("click", () => {
            try {
                const appData = JSON.parse(localStorage.getItem("todoAppData"));
                const todoLists = appData["todoLists"];
                const todoListData = todoLists.find(list => list.id === todoListId);
                displayTodoDataFromStorage.updateTodoListElement(todoList, todoListData);
            } catch (error) {
                console.log("Error:", error);
            }
        })
    } else if ([...event.target.classList].includes("delete-list-btn")) {
        // close modal and toggle form visibility
        formDialog.close();
        dataForm.classList.toggle("hide");

        // delete todo list from storage and dom
        deleteTodoListFromStorage(todoList);
        todoList.remove();
    }
}

function handleUpdatingSelectedTodoList(formDialog, dataForm, dataDisplay, event) {
    // get event target
    const targetParentEl = event.target.parentElement;
    if (targetParentEl.closest(".todo-item")) {
        // event delegation for when a todo item is clicked
        handleUpdatingTodoItem(formDialog, dataForm, dataDisplay, event);
    } else if (targetParentEl.closest(".todo-list")) {
        // event delegation for when a todo list is clicked
        handleUpdatingTodoList(formDialog, dataForm, dataDisplay, event);
    }
}

export function handleTodoItemDisplay(formDialog, dataForm, dataDisplay) {
    // use event bubbling for all of dataDisplay's todo item children
    dataDisplay.addEventListener("click", (event) => handleUpdatingTodoItem(formDialog, dataForm, dataDisplay, event));
}

export function handleTodoListDisplay(formDialog, dataForm, dataDisplay) {
    // use event bubbling for all of dataDisplay's todo list children
    dataDisplay.addEventListener("click", (event) => handleUpdatingTodoList(formDialog, dataForm, dataDisplay, event));
}

// for the "specific todo list selection" dropdown
export function handleSingleTodoListDisplay(formDialog, dataForm, dataDisplay) {
    dataDisplay.addEventListener("click", (event) => handleUpdatingSelectedTodoList(formDialog, dataForm, dataDisplay, event));
}