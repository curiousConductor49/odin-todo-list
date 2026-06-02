import addTodoItemToStorage from "../crud-ops/addTodoItemToStorage.js";
import addTodoListToStorage from "../crud-ops/addTodoListToStorage.js";
import updateTodoItemInStorage from "../crud-ops/updateTodoItemInStorage.js";
import updateTodoListInStorage from "../crud-ops/updateTodoListInStorage.js";
import createTodoItem from "../crud-ops/createTodoItem.js";
import createTodoList from "../crud-ops/createTodoList.js";

export function handleInvalidInput(formInputs) {
    const invalidInputs = formInputs.filter(input => input.value === "");
    if (invalidInputs.length > 0) {
        alert(`Please fill in the value for ${invalidInputs.map(input => input.id.split("-").join(" ")).join(", ")}`);
        return;
    }
}

export function handleTitleDuplicates(dataType, titleInput, dataFormId) {
    try {
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoItems = appData["todoItems"];
        const todoLists = appData["todoLists"];

        // return early if todo item or list is being updated (i.e. already exists in localStorage)
        if (dataFormId === "update-existing") {
            return;
        } else {
            if (dataType === "todo-item") {
                const doesDuplicateExist = todoItems.some(item => item.title === titleInput.value);

                if (doesDuplicateExist) {
                    // check the number of duplicates
                    const duplicateTitleRegex = new RegExp(`^${titleInput.value} \\([0-9]\\)$`);
                    const duplicateNum = todoItems.filter(item => duplicateTitleRegex.test(item.title)).length;

                    // append a number to the todo item title to indicate a duplication (allows 10 duplicate titles)
                    if (duplicateNum === 10) {
                        alert("No more than 10 copies of a todo item, please!");
                        return;
                    } else {
                        titleInput.value = `${titleInput.value} (${duplicateNum === 0 ? 1 : duplicateNum + 1})`;
                    }
                }
            } else if (dataType === "todo-list") {    
                const doesDuplicateExist = todoLists.some(list => list.title === titleInput.value);

                if (doesDuplicateExist) {
                    // check number of duplicates
                    const duplicateTitleRegex = new RegExp(`^${titleInput.value} \\([0-9]\\)$`);
                    const duplicateNum = todoLists.filter(list => duplicateTitleRegex.test(list.title)).length;

                    // append a number to the todo list title to indicate a duplication (allows 10 duplicate titles)
                    if (duplicateNum === 10) {
                        alert("No more than 10 copies of a todo list, please!");
                        return;
                    } else {
                        titleInput.value = `${titleInput.value} (${duplicateNum === 0 ? 1 : duplicateNum + 1})`;
                    }
                }
            }
        }
    } 
    catch (error) {
        console.log("Error:", error);
    }
}

export function getFormData(form) {
    const formInputs = [...form.elements].filter(el => el.tagName !== "BUTTON");
    return formInputs;
}

export function sendNewFormData(dataType, formInputs) {
    const formData = formInputs.map(el => el.value);

    if (dataType === "todo-item") {
        const todoItemData = createTodoItem(formData);
        addTodoItemToStorage(todoItemData);
    } else if (dataType === "todo-list") {
        const todoListData = createTodoList(formData);
        addTodoListToStorage(todoListData);
    }
}

export function sendUpdatedFormData(dataType, formInputs, dataId) {
    const formData = formInputs.map(el => el.value);

    if (dataType === "todo-item") {
        updateTodoItemInStorage(formData, dataId);
    } else if (dataType === "todo-list") {
        updateTodoListInStorage(formData, dataId);
    }
}