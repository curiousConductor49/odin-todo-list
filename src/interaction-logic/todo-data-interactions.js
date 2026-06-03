import * as formEvents from "./form-interactions.js";
import * as dynamicFormPopulator from "../utility/dynamic-form-population.js";
import * as todoDataDisplayer from "../utility/display-todo-data.js"
import populateTodoListDropdown from "../utility/dynamic-selection-population.js";
import deleteTodoItemFromStorage from "../crud-ops/delete-todo-item-from-storage.js";
import deleteTodoListFromStorage from "../crud-ops/delete-todo-list-from-storage.js";

export function handleUpdatingTodoItem(formDialog, dataForm, dataDisplay, event) {
    // get the todo item element
    const todoItem = event.target.closest(".todo-item");
    const todoItemId = todoItem.dataset.id;
    
    // conditional logic based on which button of the todo item element was clicked
    if ([...event.target.classList].includes("update-item-btn")) {
        // set innerHTML of form
        dataForm.innerHTML = dynamicFormPopulator.populateExistingTodoItemFormFields(todoItemId);

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
                todoDataDisplayer.updateTodoItemElement(todoItem, todoItemData);
            } catch (error) {
                console.log("Error:", error);
            }
        })
    } else if ([...event.target.classList].includes("delete-item-btn")) {
        // close modal
        formDialog.close();

        // remove todo item from storage and dom
        deleteTodoItemFromStorage(todoItem);
        todoItem.remove();
    }
}

export function handleUpdatingTodoList(formDialog, dataForm, dataDisplay, todoListDropdown, event) {
    // get the todo list element
    const todoList = event.target.closest(".todo-list");
    const todoListId = todoList.dataset.id;

    // conditional logic based on which button of the todo list element was clicked
    if ([...event.target.classList].includes("update-list-btn")) {
        // set innerHTML of form
        dataForm.innerHTML = dynamicFormPopulator.populateExistingTodoListFormFields(todoListId);

        // toggle form visibility and open modal
        dataForm.classList.toggle("hide");
        formDialog.showModal();

        // handle form submission (for either all todo lists or a single todo list displayed from the selection dropdown)
        todoList.parentElement.id === "single-todo-list-display" ? formEvents.handleSelectedTodoListData(formDialog, dataForm, todoListId) : formEvents.handleTodoListData(formDialog, dataForm, dataDisplay, todoListDropdown, todoListId);

        // handle form closing
        formEvents.closeForm(formDialog, dataForm);

        // update dom element
        const submitFormBtn = dataForm.querySelector("#submit-form-btn");
        submitFormBtn.addEventListener("click", () => {
            try {
                const appData = JSON.parse(localStorage.getItem("todoAppData"));
                const todoLists = appData["todoLists"];
                const todoListData = todoLists.find(list => list.id === todoListId);
                todoDataDisplayer.updateTodoListElement(todoList, todoListData);
                // refresh options for todo list selection
                todoListDropdown.innerHTML = populateTodoListDropdown();
            } catch (error) {
                console.log("Error:", error);
            }
        })
    } else if ([...event.target.classList].includes("delete-list-btn")) {
        // close modal
        formDialog.close();

        // delete todo list from storage and dom
        deleteTodoListFromStorage(todoList);
        todoList.remove();

        // refresh options for todo list selection
        todoListDropdown.innerHTML = populateTodoListDropdown();
    }
}

export function handleUpdatingSelectedTodoList(formDialog, dataForm, dataDisplay, todoListDropdown, event) {
    // get event target
    const targetParentEl = event.target.parentElement;
    if (targetParentEl.closest(".todo-item")) {
        // event delegation for when a todo item is clicked
        handleUpdatingTodoItem(formDialog, dataForm, dataDisplay, event);
    } else if (targetParentEl.closest(".todo-list")) {
        // event delegation for when a todo list is clicked
        handleUpdatingTodoList(formDialog, dataForm, dataDisplay, todoListDropdown, event);
    }
}