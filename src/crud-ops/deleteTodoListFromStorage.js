export default function deleteTodoListFromStorage(todoListEl) {
    try {
        // get and set json data to the updated array of todo lists
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoListsData = appData["todoLists"];
        // temp value for testing, the actual arg should be the DOM el for the todo list whose data-* attribute is accessed
        // const todoListId = todoListEl;
        const todoListId = todoListEl.dataset.id;
        const todoListIndex = todoListsData.findIndex(list => list["id"] === todoListId);
        const updatedTodoLists = todoListsData.toSpliced(todoListIndex, 1);
        appData["todoLists"] = updatedTodoLists;
        // delete todo items that have the todo list as a parent list
        const todoItemsData = appData["todoItems"];
        const updatedTodoItems = todoItemsData.filter(item => item["parentListId"] !== todoListId);
        appData["todoItems"] = updatedTodoItems;

        localStorage.setItem("todoAppData", JSON.stringify(appData));
    } catch (error) {
        console.log("Error:", error);
    }
}