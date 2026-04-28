export function createTodoItemElement(todoItemData) {
    // destructure todo item data
    const [ title, id, , dueDate, priority, ...rest] = todoItemData;
    const todoItemEl = `
        <div class="todo-item" data-id="${id}">
            <p id="item-title">${title}</p>
            <time id="item-due-date" datetime="${dueDate}">${new Date(dueDate).toDateString()}</time>
            <p id="item-priority">${priority}</p>
            <div class="item-btn-container">
                <button id="update-item-btn">Update</button>
                <button id="delete-item-btn">Delete</button>
            </div>
        </div>
    `
    return todoItemEl;
}

export function createTodoListElement() {}
export function displaySelectedTodoList() {}
export function displayAllTodoItems() {}
export function displayAllTodoLists() {}