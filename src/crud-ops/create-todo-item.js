export default function createTodoItem(inputData) {
    // destructure input data
    const [ title, description, dueDate, priority, parentList ] = inputData;
    // get JSON data for todo item's parent list id
    const todoLists = JSON.parse(localStorage.getItem("todoAppData"))["todoLists"];
    const parentTodoListId = todoLists.find(list => list.id === parentList)["id"];
    // create and return todo item object
    const todoItem = {
        title,
        id: crypto.randomUUID(),
        description,
        dueDate,
        priority,
        parentListTitle: parentList,
        parentListId: parentTodoListId, 
    }
    return todoItem;
}