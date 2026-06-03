export default function deleteTodoItemFromStorage(todoItemEl) {
    try {
        // get and set json data to the updated array of todo items
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoItemsData = appData["todoItems"];
        const todoItemId = todoItemEl.dataset.id;
        const todoItemIndex = todoItemsData.findIndex(item => item["id"] === todoItemId);
        const updatedTodoItems = todoItemsData.toSpliced(todoItemIndex, 1);
        appData["todoItems"] = updatedTodoItems;

        localStorage.setItem("todoAppData", JSON.stringify(appData));
    } catch (error) {
        console.log("Error:", error);
    }
}