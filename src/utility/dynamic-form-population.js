import populateTodoListDropdown from "./dynamic-selection-population.js";

export function populateNewTodoItemFormFields() {
    try {
        // create form fields
        const formFieldsHTML = `
            <div class="field-container">
                <label for="item-title">Name:</label>
                <input type="text" id="item-title" name="item-title" placeholder="purring...">
            </div>
            
            <div class="field-container">
                <label for="item-description">Description: </label>
                <textarea id="item-description" col="15" row="30" placeholder="meow, meow, meow..."></textarea>
            </div>
            
            <div class="field-container">
                <label for="item-due-date">Due Date:</label>
                <input type="date" id="item-due-date" name="item-due-date">
            </div>
            
            <div class="field-container">
                <label for="item-priority">Priority:</label>
                <select id="item-priority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            
            <div class="field-container">
                <label for="todo-list-parent">Todo List:</label>
                <select id="todo-list-parent">
                    ${populateTodoListDropdown()};
                </select>
            </div>

            <div class="btn-container">
                <button type="submit" id="submit-form-btn">Add</button>
                <button type="button" id="close-form-btn">Close</button>
            </div>
        `
        return formFieldsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function populateNewTodoListFormFields() {
    try {
        // create form fields
        const formFieldsHTML = `
            <div class="field-container">
                <label for="list-title">Name:</label>
                <input type="text" id="list-title" name="list-title" placeholder="a guide to making lap biscuits">
            </div>
            
            <div class="field-container">
                <label for="list-description">Description: </label>
                <textarea id="list-description" col="15" row="30" placeholder="baking biscuits, baking biscuits!"></textarea>
            </div>
            
            <div class="btn-container">
                <button type="submit" id="submit-form-btn">Add</button>
                <button type="button" id="close-form-btn">Close</button>
            </div>
        `
        return formFieldsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function populateExistingTodoItemFormFields(todoItemId) {
    try {
        // get JSON data
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoItems = appData["todoItems"];
        const todoLists = appData["todoLists"];
        const currentTodoItem = todoItems.find(item => item.id === todoItemId);

        // create the option elements for parent lists and set the option for the current todo item's parent todo list as selected
        const parentListOptionsHTML = todoLists.map(list => {
            if (list.id === currentTodoItem.parentListId) {
                return `<option value="${list.title}" selected>${list.title}</option>`
            } else {
                return `<option value="${list.title}">${list.title}</option>`
            }
        }).join("");
        
        // create the option elements for priority level and set the option for the current todo item's priority as selected
        const priorityLevels = ["High", "Medium", "Low"];
        const priorityOptionsHTML = priorityLevels.map(level => {
            if (level.toLowerCase() === currentTodoItem.priority) {
                return `<option value="${level.toLowerCase()}" selected>${level}</option>`
            } else {
                return `<option value="${level.toLowerCase()}">${level}</option>`
            }
        }).join("");

        // create form fields
        const formFieldsHTML = `
            <div class="field-container">
                <label for="item-title">Name:</label>
                <input type="text" id="item-title" name="item-title" value="${currentTodoItem.title}">
            </div>
            
            <div class="field-container">
                <label for="item-description">Description: </label>
                <textarea id="item-description" col="15" row="30">${currentTodoItem.description}</textarea>
            </div>
            
            <div class="field-container">
                <label for="item-due-date">Due Date:</label>
                <input type="date" id="item-due-date" name="item-due-date" value="${currentTodoItem.dueDate}">
            </div>
            
            <div class="field-container">
                <label for="item-priority">Priority:</label>
                <select id="item-priority">
                    ${priorityOptionsHTML};
                </select>
            </div>
            
            <div class="field-container">
                <label for="todo-list-parent">Todo List:</label>
                <select id="todo-list-parent">
                    ${parentListOptionsHTML}
                </select>
            </div>

            <div class="btn-container">
                <button type="submit" id="submit-form-btn">Submit</button>
                <button type="button" id="close-form-btn">Close</button>
            </div>
        `
        return formFieldsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function populateExistingTodoListFormFields(todoListId) {
    try {
        // get JSON data
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoLists = appData["todoLists"];
        const currentTodoList = todoLists.find(list => list.id === todoListId);
        // create form fields
        const formFieldsHTML = `
            <div class="field-container">
                <label for="list-title">Name:</label>
                <input type="text" id="list-title" name="list-title" value="${currentTodoList.title}">
            </div>
            
            <div class="field-container">
                <label for="list-description">Description: </label>
                <textarea id="list-description" col="15" row="30">${currentTodoList.description}</textarea>
            </div>
            
            <div class="btn-container">
                <button type="submit" id="submit-form-btn">Submit</button>
                <button type="button" id="close-form-btn">Close</button>
            </div>
        `
        return formFieldsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}