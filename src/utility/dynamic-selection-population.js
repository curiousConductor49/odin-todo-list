export default function populateTodoListDropdown() {
    try {
        // get JSON data for todo lists
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoLists = appData["todoLists"];
        // create option elements
        const blankOptionHTML = [`<option value="" disabled selected hidden>Select a purr below</option>`]
        const optionsHTML = blankOptionHTML.concat(todoLists.map(list => `<option value="${list.id}">${list.title}</option>`).join(""));
        return optionsHTML;
    } catch (error) {
        console.log("Error:", error);
    }
}