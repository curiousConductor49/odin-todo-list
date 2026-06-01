import * as todoDataDisplayer from "../utility/displayTodoDataFromStorage.js"
import * as handleFormLogic from "../form-logic/handle-form-data.js";
import toggleDisplays from "../utility/toggleDisplays.js";

// helper function for creating new data and updating existing data (todo items)
function handleItemDataSubmission(dataForm, event, itemId = null) {
    // prevent default form submission behaviour
    event.preventDefault();
    // get form data
    const formData = handleFormLogic.getFormData(dataForm);
    // validate form data
    handleFormLogic.handleInvalidInput(formData);
    // handle duplicate titles
    handleFormLogic.handleTitleDuplicates("todo-item", dataForm.querySelector("#item-title"));
    // add or update form data in localStorage
    itemId === null ? handleFormLogic.sendNewFormData("todo-item", formData) : handleFormLogic.sendUpdatedFormData("todo-item", formData, itemId);
}

// helper function for creating new data and updating existing data (todo lists)
function handleListDataSubmission(dataForm, event, listId = null) {
    // prevent default form submission behaviour
    event.preventDefault();
    // get form data
    const formData = handleFormLogic.getFormData(dataForm);
    // validate form data
    handleFormLogic.handleInvalidInput(formData);
    // handle duplicate titles
    handleFormLogic.handleTitleDuplicates("todo-list", dataForm.querySelector("#list-title"));
    // add or update form data in localStorage
    listId === null ? handleFormLogic.sendNewFormData("todo-list", formData) : handleFormLogic.sendUpdatedFormData("todo-list", formData, listId);
}

export function handleTodoItemData(formDialog, dataForm, dataDisplay, itemId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => {
        // handle data submission
        handleItemDataSubmission(dataForm, event, itemId);
        // toggle form visibility and close dialog
        dataForm.classList.toggle("hide");
        formDialog.close();
        // update todo items data display
        dataDisplay.innerHTML = todoDataDisplayer.createAllTodoItemElements();
    });
}

export function handleTodoListData(formDialog, dataForm, dataDisplay, listId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => {
        // handle data submission
        handleListDataSubmission(dataForm, event, listId);
        // toggle form visibility and close dialog
        dataForm.classList.toggle("hide");
        formDialog.close();
        // update todo lists data display
        dataDisplay.innerHTML = todoDataDisplayer.createAllTodoListElements();
    });
}

export function handleSingleTodoListData(formDialog, dataForm, listId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => {
        // handle data submission
        handleListDataSubmission(dataForm, event, listId);
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