export function populateTodoListDropdown() {
    try {
        // get JSON data for todo lists
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoLists = appData["todoLists"];
        // create option elements
        const optionsHTML = todoLists.map(list => `<option value="${list.title}">${list.title}</option>`).join("");
        return optionsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function populateTodoItemFormFields() {
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
                    <option value="high">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            
            <div class="field-container">
                <label for="todo-list-parent">Todo List:</label>
                <select id="todo-list-parent">
                    ${populateTodoListDropdown()};
                </select>
            </div>

            <div id="btn-container>
                <button type="submit" id="submit-form-btn">Add</button>
                <button id="close-form-btn">Close</button>
            </div>
        `
        return formFieldsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}