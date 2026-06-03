import * as todoDataDisplayer from "../utility/display-todo-data.js"
import * as handleFormDataLogic from "../form-logic/handle-form-data.js";

// helper function for creating new data and updating existing data (todo items)
function submitItemData(dataForm, event, itemId = null) {
    // prevent default form submission behaviour
    event.preventDefault();
    // get form data
    const formData = handleFormDataLogic.getFormData(dataForm);
    // validate form data
    handleFormDataLogic.handleInvalidInput(formData);
    // handle duplicate titles
    handleFormDataLogic.handleTitleDuplicates("todo-item", dataForm.querySelector("#item-title"), dataForm.id);
    // add or update form data in localStorage
    itemId === null ? handleFormDataLogic.sendNewFormData("todo-item", formData) : handleFormDataLogic.sendUpdatedFormData("todo-item", formData, itemId);
}

// helper function for creating new data and updating existing data (todo lists)
function submitListData(dataForm, event, listId = null) {
    // prevent default form submission behaviour
    event.preventDefault();
    // get form data
    const formData = handleFormDataLogic.getFormData(dataForm);
    // validate form data
    handleFormDataLogic.handleInvalidInput(formData);
    // handle duplicate titles
    handleFormDataLogic.handleTitleDuplicates("todo-list", dataForm.querySelector("#list-title"), dataForm.id);
    // add or update form data in localStorage
    listId === null ? handleFormDataLogic.sendNewFormData("todo-list", formData) : handleFormDataLogic.sendUpdatedFormData("todo-list", formData, listId);
}

export function handleTodoItemData(formDialog, dataForm, dataDisplay, itemId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => {
        // handle data submission
        submitItemData(dataForm, event, itemId);
        // toggle form visibility and close dialog
        dataForm.classList.toggle("hide");
        formDialog.close();
        // update data display with all todo items if the data is not being displayed from a specific todo list
        if (dataDisplay.id !== "single-todo-list-display") {
            dataDisplay.innerHTML = todoDataDisplayer.createAllTodoItemElements();
        }
    });
}

export function handleTodoListData(formDialog, dataForm, dataDisplay, listId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => {
        // handle data submission
        submitListData(dataForm, event, listId);
        // toggle form visibility and close dialog
        dataForm.classList.toggle("hide");
        formDialog.close();
        // update todo lists data display
        dataDisplay.innerHTML = todoDataDisplayer.createAllTodoListElements();
    });
}

export function handleSelectedTodoListData(formDialog, dataForm, listId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => {
        // handle data submission
        submitListData(dataForm, event, listId);
        // toggle form display and close modal
        dataForm.classList.toggle("hide");
        formDialog.close();
    });
}

export function closeForm(formDialog, dataForm) {
    const closeFormBtn = dataForm.querySelector("#close-form-btn");
    
    closeFormBtn.addEventListener("click", () => {
        formDialog.close();
        dataForm.classList.toggle("hide");
    });
}