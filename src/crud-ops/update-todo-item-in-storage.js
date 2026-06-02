export default function updateTodoItemInStorage(inputData, todoItemId) {
    try {
        // destructure input data
        const [ title, description, dueDate, priority, parentList ] = inputData;
        // get JSON data for todo item
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoLists = appData["todoLists"];
        const todoItem = appData["todoItems"].find(item => item.id === todoItemId);
        // set properties of todo item to new values
        todoItem["title"] = title;
        todoItem["description"] = description;
        todoItem["dueDate"] = dueDate;
        todoItem["priority"] = priority;
        todoItem["parentListId"] = todoLists.find(list => list.title === parentList).id;
        todoItem["parentListTitle"] = parentList;
        // set updated JSON data
        localStorage.setItem("todoAppData", JSON.stringify(appData));
    } catch (error) {
        console.log("Error:", error);
    }
}