export default function addTodoItemToStorage(todoItem) {
    try {
        const currentAppData = JSON.parse(localStorage.getItem("todoAppData"));
        currentAppData["todoItems"].push(todoItem);
        localStorage.setItem("todoAppData", JSON.stringify(currentAppData));
    } catch (error) {
        console.log("Error:", error);
    }
}