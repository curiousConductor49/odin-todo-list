export default function createTodoList(inputData) {
    // destructure input data
    const [ title, description ] = inputData;
    // create and return todo list object
    const todoList = {
        title,
        id: crypto.randomUUID(),
        description,
    }
    return todoList;
}