export default function createTodoItem(inputData) {
    // destructure input data
    const [ title, description, dueDate, priority, parentList ] = inputData;
    // create and return todo item object
    const todoItem = {
        title,
        id: crypto.randomUUID(),
        description,
        dueDate: new Date(dueDate).toISOString(),
        priority,
        parentList,
    }
    return todoItem;
}