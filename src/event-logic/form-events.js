import * as handleFormLogic from "../form-logic/handle-form-data.js";
import toggleDisplays from "../utility/toggleDisplays.js";

// helper function for creating new data and updating existing data (todo items)
function handleItemDataSubmission(dataForm, dataDisplay, event, itemId = null) {
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
    // toggle displays
    toggleDisplays(dataForm, dataDisplay);
}

// helper function for creating new data and updating existing data (todo lists)
function handleListDataSubmission(dataForm, dataDisplay, event, listId = null) {
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
    // toggle displays
    toggleDisplays(dataDisplay, dataForm);
}

export function handleTodoItemData(dataForm, dataDisplay, itemId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => handleItemDataSubmission(dataForm, dataDisplay, event, itemId));
}

export function handleTodoListData(dataForm, dataDisplay, listId = null) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => handleListDataSubmission(dataForm, dataDisplay, event, listId));
}

export function closeForm(dataForm, dataDisplay) {
    const closeFormBtn = dataForm.querySelector("#close-form-btn");
    
    closeFormBtn.addEventListener("click", () => toggleDisplays(dataDisplay, dataForm));
}