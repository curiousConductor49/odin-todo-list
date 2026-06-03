export function createTodoItemElement(todoItemData) {
    // destructure todo item data
    const { title, id, description, dueDate, priority, ...rest } = todoItemData;
    // create html
    const arr = dueDate.split("-");
    const formattedDueDate = new Date(...arr.map(int => arr.indexOf(int) === 1 ? parseInt(int) - 1 : parseInt(int))).toDateString();
    const todoItemEl = `
        <div class="todo-item" data-id="${id}">
            <p class="item-title">${title}</p>
            <time class="item-due-date" datetime="${dueDate}">due: ${formattedDueDate}</time>
            <p class="item-priority">priority: ${priority}</p>
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
                <button class="update-list-btn">Update</button>
                <button class="delete-list-btn">Delete</button>
            </div>
        </div>
    `
    return todoListEl;
}

export function updateTodoItemElement(todoItemEl, todoItemData) {
    // capture children of todo item element
    const itemTitle = todoItemEl.querySelector(".item-title");
    const itemDueDate = todoItemEl.querySelector(".item-due-date");
    const itemPriority = todoItemEl.querySelector(".item-priority");
    // destructure properties of todo item data
    const { title, id, description, dueDate, priority, ...rest } = todoItemData;
    // update text content of children
    const arr = dueDate.split("-");
    const formattedDueDate = new Date(...arr.map(int => arr.indexOf(int) === 1 ? parseInt(int) - 1 : parseInt(int))).toDateString();
    itemTitle.textContent = title;
    itemDueDate.textContent = formattedDueDate;
    itemPriority.textContent = priority;
}

export function updateTodoListElement(todoListEl, todoListData) {
    // capture children of todo item element
    const listTitle = todoListEl.querySelector(".list-title");
    const listDescription = todoListEl.querySelector(".list-description");
    // destructure properties of todo item data
    const { title, id,description } = todoListData;
    // update text content of children
    listTitle.textContent = title;
    listDescription.textContent = description;
}

export function createSelectedTodoListElement(selectedTodoList) {
    try {
        // get JSON data for selected todo list and corresponding todo item children
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoList = appData["todoLists"].find(list => list.id === selectedTodoList.value);
        const { title, id, description } = todoList;
        const todoItemChildren = appData["todoItems"].filter(item => item.parentListId === id);
        
        // create html
        const completeTodoListEl = `
        <div class="todo-list" data-id="${id}">
            <p class="list-title">${title}</p>
            <p class="list-description">${description}</p>
            <div class="todo-items">
                ${todoItemChildren.map(item => createTodoItemElement(item)).join("")}
            </div>
            <div class="btn-container">
                <button class="update-list-btn">Update</button>
                <button class="delete-list-btn">Delete</button>
            </div>
        </div>
    `
    return completeTodoListEl;
    } catch (error) {
        console.log("Error:", error);
    }
}

export function createAllTodoItemElements() {
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

export function createAllTodoListElements() {
    try {
        // get JSON data for all todo lists
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoLists = appData["todoLists"];
        // create html
        const allTodoListsHtml = `
            ${todoLists.map(list => createTodoListElement(list)).join("")}
        `
        return allTodoListsHtml;
    } catch (error) {
        console.log("Error:", error);
    }
}