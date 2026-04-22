export default function onPageLoad() {
    if (localStorage.getItem("todoAppData")) {
        return;
    } else if (localStorage.getItem("todoAppData") === null) {
        const defaultListID = crypto.randomUUID();
        const appData = {
            todoLists: [
                {
                    title: "Default Tuxedo",
                    id: defaultListID,
                    desription: "..."
                },
            ],
            todoItems: [],
        }
        localStorage.setItem("todoAppData", JSON.stringify(appData));
    }
}