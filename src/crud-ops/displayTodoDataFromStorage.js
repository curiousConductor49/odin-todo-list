export function createTodoItemElement(todoItemData) {
    // destructure todo item data
    const [ title, id, , dueDate, priority, ...rest] = todoItemData;
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
    const [ title, id, description ] = todoListData;
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

export function displaySelectedTodoList() {}
export function displayAllTodoItems() {}
export function displayAllTodoLists() {}