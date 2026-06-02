export default function updateTodoListInStorage(inputData, todoListId) {
    try {
        // destructure input data
        const [ title, description ] = inputData;
        // get JSON data for todo list
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoList = appData["todoLists"].find(list => list.id === todoListId);
        // set properties of todo list to new values
        todoList["title"] = title;
        todoList["description"] = description;
        // set updated JSON data
        localStorage.setItem("todoAppData", JSON.stringify(appData));
    } catch (error) {
        console.log("Error:", error);
    }
}