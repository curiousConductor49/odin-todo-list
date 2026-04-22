export default function addTodoListToStorage(todoList) {
    try {
        const currentAppData = JSON.parse(localStorage.getItem("todoAppData"));
        currentAppData["todoLists"].push(todoList);
        localStorage.setItem("todoAppData", JSON.stringify(currentAppData));
    } catch (error) {
        console.log("Error:", error);
    }
}