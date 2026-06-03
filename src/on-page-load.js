export function initlocalStorageData() {
    if (localStorage.getItem("todoAppData")) {
        return;
    } else if (localStorage.getItem("todoAppData") === null) {
        const defaultListID = crypto.randomUUID();
        const appData = {
            todoLists: [
                {
                    title: "Default Tuxedo",
                    id: defaultListID,
                    description: "..."
                },
            ],
            todoItems: [],
        }
        localStorage.setItem("todoAppData", JSON.stringify(appData));
    }
}

export function doesTodoItemDataExist() {
    try {
        const appData = JSON.parse(localStorage.getItem("todoAppData"));
        const todoItemsNum = appData["todoItems"].length;

        return todoItemsNum > 0 ? true : false;
    } catch (error) {
        console.log("Error:", error);
    }
}