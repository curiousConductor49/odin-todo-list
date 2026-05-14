import * as dynamicHTMLPopulator from "../utility/dynamicHtmlPopulation.js";
import * as handleFormLogic from "../form-logic/handle-form-data.js";
import toggleDisplays from "../utility/toggleDisplays.js";

// generic form close function
export function closeForm(dataForm, dataDisplay) {
    // add the form fields to the DOM
    dataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoItemFormFields();
    
    // attach event listener to form closure button
    const closeFormBtn = dataForm.querySelector("#close-form-btn");
    closeFormBtn.addEventListener("click", () => toggleDisplays(dataDisplay, dataForm));
}

// for "create new" and "update existing" form for todo items
function handleNewDataSubmission(dataForm, event) {
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
}

export function handleNewTodoItemData(dataForm) {
    // add the form fields to the DOM
    dataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoItemFormFields();

    // attach event listener to form submission button
    const submitFormBtn = dataForm.querySelector("#submit-form-btn");
    submitFormBtn.addEventListener("click", (event) => handleNewDataSubmission(dataForm, event));
}

export function handleUpdatedTodoItemData(dataForm) {}

// for "create new" and "update existing" form for todo lists
export function handleNewTodoListData(dataForm) {}

export function handleUpdatedTodoListData(dataForm) {}