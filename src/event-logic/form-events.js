import * as dynamicHTMLPopulator from "../utility/dynamicHtmlPopulation.js";
import * as handleFormLogic from "../form-logic/handle-form-data.js";
import toggleDisplays from "../utility/toggleDisplays.js";

// for "create new" and "update existing" form for todo items
function handleItemDataSubmission(dataForm, dataDisplay, event) {
    // prevent default form submission behaviour
    event.preventDefault();
    // get form data
    const formData = handleFormLogic.getFormData(dataForm);
    // validate form data
    handleFormLogic.handleInvalidInput(formData);
    // handle duplicate titles
    handleFormLogic.handleTitleDuplicates("todo-item", dataForm.querySelector("#item-title"));
    // add form data to localStorage
    handleFormLogic.sendNewFormData("todo-item", formData);
    // toggle displays
    toggleDisplays(dataForm, dataDisplay);
}

// generic form close function
export function closeForm(dataForm, dataDisplay) {
    const closeFormBtn = dataForm.querySelector("#close-form-btn");
    
    closeFormBtn.addEventListener("click", () => toggleDisplays(dataDisplay, dataForm));
}

export function handleNewTodoItemData(dataForm, dataDisplay) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => handleItemDataSubmission(dataForm, dataDisplay, event));
}

export function handleUpdatedTodoItemData(dataForm) {}

// for "create new" and "update existing" form for todo lists
function handleListDataSubmission(dataForm, dataDisplay, event) {
    // prevent default form submission behaviour
    event.preventDefault();
    // get form data
    const formData = handleFormLogic.getFormData(dataForm);
    // validate form data
    handleFormLogic.handleInvalidInput(formData);
    // handle duplicate titles
    handleFormLogic.handleTitleDuplicates("todo-list", dataForm.querySelector("#list-title"));
    // add form data to localStorage
    handleFormLogic.sendNewFormData("todo-list", formData);
    // toggle displays
    toggleDisplays(dataDisplay, dataForm);
}

export function handleNewTodoListData(dataForm, dataDisplay) {
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");

    submitFormBtn.addEventListener("click", (event) => handleListDataSubmission(dataForm, dataDisplay, event));
}

export function handleUpdatedTodoListData(dataForm) {}