export function createTodoItemElement(todoItemData) {
    // destructure todo item data
    const { title, id, description, dueDate, priority, ...rest } = todoItemData;
    // create html
    const todoItemEl = `
        <div class="todo-item" data-id="${id}">
            <p class="item-title">${title}</p>
            <time class="item-due-date" datetime="${dueDate}">${new Date(dueDate).toDateString()}</time>
            <p class="item-priority">${priority}</p>
            <div class="item-btn-container">
                <button class="update-item-btn">Update</button>
                <button class="delete-item-btn">Delete</button>
            </div>
        </div>
    `
    return todoItemEl;
}

export function createTodoListElement(todoListData) {
    // destructure todo item data
    const { title, id, description } = todoListData;
    // create html
    const todoListEl = `
        <div class="todo-list" data-id="${id}">
            <p class="list-title">${title}</p>
            <p class="list-description">${description}</p>
            <div class="item-btn-container">
                <button class="update-item-btn">Update</button>
                <button class="delete-item-btn">Delete</button>
            </div>
        </div>
    `
    return todoListEl;
}

export function displaySelectedTodoList(selectedTodoList) {
    try {
        // get JSON data for selected todo list and corresponding todo item children
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoList = appData["todoLists"].find(list => list.title === selectedTodoList.value);
        const { title, id, description } = todoList;
        const todoItemChildren = appData["todoItems"].filter(item => item.parentListTitle === selectedTodoList.value);
        
        // create html
        const completeTodoListEl = `
        <div class="todo-list" data-id="${id}">
            <p class="list-title">${title}</p>
            <p class="list-description">${description}</p>
            <div class="todo-items">
                ${todoItemChildren.map(item => createTodoItemElement(item)).join("")}
            </div>
            <div class="item-btn-container">
                <button class="update-item-btn">Update</button>
                <button class="delete-item-btn">Delete</button>
            </div>
        </div>
    `
    return completeTodoListEl;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function displayAllTodoItems() {
    try {
        // get JSON data for all todo items
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoItems = appData["todoItems"];
        // create html
        const allTodoItemsHtml = `
            ${todoItems.map(item => createTodoItemElement(item)).join("")}
        `
        return allTodoItemsHtml;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function displayAllTodoLists() {}