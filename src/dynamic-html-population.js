export function populateTodoListDropdown(dropdownEl) {
    try {
        // get JSON data for todo lists
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoLists = appData["todoLists"];
        // create option elements
        const optionsHTML = todoLists.map(list => `<option value="${list.title}">${list.title}</option>`).join("");
        return optionsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}