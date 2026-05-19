// imports
import "./styles.css";
import initlocalStorageData from "./onPageLoad.js";
import createTodoItem from "./crud-ops/createTodoItem.js";
import createTodoList from "./crud-ops/createTodoList.js";
import addTodoItemToStorage from "./crud-ops/addTodoItemToStorage.js";
import addTodoListToStorage from "./crud-ops/addTodoListToStorage.js";
import deleteTodoItemFromStorage from "./crud-ops/deleteTodoItemFromStorage.js";
import deleteTodoListFromStorage from "./crud-ops/deleteTodoListFromStorage.js";
import updateTodoItemInStorage from "./crud-ops/updateTodoItemInStorage.js";
import updateTodoListInStorage from "./crud-ops/updateTodoListInStorage.js";
import * as dynamicHTMLPopulator from "./utility/dynamicHtmlPopulation.js";
import * as todoDataDisplayer from "./utility/displayTodoDataFromStorage.js";
import * as handleFormLogic from "./form-logic/handle-form-data.js";
import * as formEvents from "./event-logic/form-events.js";
import * as dataDisplayEvents from "./event-logic/data-display-events.js"
import toggleDisplays from "./utility/toggleDisplays.js";


// DOM elements
// dashboard
const appDashboard = document.querySelector("#app-dashboard");
// container for options to create todo data
const newItemBtn = document.querySelector("#new-item-btn");
const newListBtn = document.querySelector("#new-list-btn");
// container for options to view todo data
const controlPanel = document.querySelector("#control-panel");
const newBtnsContainer = document.querySelector(".new-btns-container");
const viewOptionsContainer = document.querySelector(".view-options-container");
const allItemsBtn = document.querySelector("#all-items-btn");
const allListsBtn = document.querySelector("#all-lists-btn");
const todoListDropdown = document.querySelector("#todo-list-dropdown");
// container to display todo data
const dataDisplay = document.querySelector("#data-display");
// container for forms to enter todo data
const createNewTodoDataForm = document.querySelector("#create-new");
const updateExistingTodoDataForm = document.querySelector("#update-existing");

// upon complete page load, initialize app data and populate the todo list dropdown based on app data
window.addEventListener("load", initlocalStorageData);
window.addEventListener("load", () => todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown());

// creating new todo data
newItemBtn.addEventListener("click", () => {
    // toggle visibility of data-display container and create-new form
    toggleDisplays(dataDisplay, createNewTodoDataForm);

    // populate form
    createNewTodoDataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoItemFormFields();

    // handle using form
    formEvents.handleTodoItemData(createNewTodoDataForm, dataDisplay);

    // handle closing form
    formEvents.closeForm(createNewTodoDataForm, dataDisplay);
});

newListBtn.addEventListener("click", () => {
    // toggle visibility of data-display container and create-new form
    toggleDisplays(dataDisplay, createNewTodoDataForm);

    // populate form
    createNewTodoDataForm.innerHTML = dynamicHTMLPopulator.populateNewTodoListFormFields();
    // handle using form
    formEvents.handleTodoListData(createNewTodoDataForm, dataDisplay);
    
    // handle closing form
    formEvents.closeForm(createNewTodoDataForm, dataDisplay);
});

// viewing todo data
allItemsBtn.addEventListener("click", () => {
    // show all todo items
    dataDisplay.innerHTML = todoDataDisplayer.createAllTodoItemElements();
    
    // handle individual todo item logic (updating, deleting)
    dataDisplayEvents.handleTodoItemDisplay(updateExistingTodoDataForm, dataDisplay);
});

allListsBtn.addEventListener("click", () => {
    // show all todo lists
    dataDisplay.innerHTML = todoDataDisplayer.createAllTodoListElements();

    // handle individual todo list logic (updating, deleting)
    dataDisplayEvents.handleTodoListDisplay(updateExistingTodoDataForm, dataDisplay);

    // update options for specific todo list selection
    todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();

    // const todoListEls = [...document.querySelectorAll(".todo-list")];
    // todoListEls.forEach(listEl => {
    //     const todoList = listEl;
    //     const todoListId = listEl.dataset.id;
    //     const updateListBtn = todoList.querySelector(".update-list-btn");
    //     const deleteListBtn = todoList.querySelector(".delete-list-btn");

    //     // set event listeners for update interaction
    //     updateListBtn.addEventListener("click", (event) => {
    //         // toggle visibility of data-display container and update-existing form
    //         toggleDisplays(dataDisplay, updateExistingTodoDataForm);
    //         // populate update-existing form
    //         updateExistingTodoDataForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoListFormFields(todoList.dataset.id);

    //         // handle form submission
    //         const submitFormBtn = updateExistingTodoDataForm.querySelector("#submit-form-btn");
    //         submitFormBtn.addEventListener("click", (event) => {
    //             // prevent default form submission behaviour
    //             event.preventDefault();

    //             const formData = handleFormLogic.getFormData(updateExistingTodoDataForm);
    //             handleFormLogic.handleInvalidInput(formData);
    //             handleFormLogic.handleTitleDuplicates("todo-list", updateExistingTodoDataForm.querySelector("#list-title"));
    //             handleFormLogic.sendUpdatedFormData("todo-list", formData, todoListId);


    //             // toggle visibility of data-display container and update-existing form
    //             toggleDisplays(dataDisplay, updateExistingTodoDataForm);

    //             // update text content of todo list element html
    //             try {
    //                 const todoListData = JSON.parse(localStorage.getItem("todoAppData"))["todoLists"].find(list => list.id === todoListId);
    //                 todoDataDisplayer.updateTodoListElement(todoList, todoListData);
    //             } catch (error) {
    //                 console.log("Error:", error);
    //             }

    //             // update options for specific todo list selection
    //             todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();
    //         })

    //         // handle closing form
    //         const closeFormBtn = updateExistingTodoDataForm.querySelector("#close-form-btn");
    //         closeFormBtn.addEventListener("click", () => {
    //             // toggle visibility of data-display container and update-existing form
    //             toggleDisplays(dataDisplay, updateExistingTodoDataForm);
    //         })
    //     });
    //     // set event listeners for deletion interaction
    //     deleteListBtn.addEventListener("click", (event) => {
    //         // delete todo item and remove from dom
    //         deleteTodoListFromStorage(listEl);
    //         listEl.remove();
    //         // update options for specific todo list selection
    //         todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();
    //     });
    // })
});

todoListDropdown.addEventListener("change", (event) => {
    // show list and todo items within list
    dataDisplay.innerHTML = todoDataDisplayer.createSelectedTodoListElement(event.target);

    // individual todo item logic (updating, deleting)
    const todoItemEls = [...document.querySelectorAll(".todo-item")];
    todoItemEls.forEach(itemEl => {
        const todoItem = itemEl;
        const todoItemId = itemEl.dataset.id;
        const updateItemBtn = todoItem.querySelector(".update-item-btn");
        const deleteItemBtn = todoItem.querySelector(".delete-item-btn");

        // set event listeners for update interaction
        updateItemBtn.addEventListener("click", (event) => {
            // toggle visibility of data-display container and update-existing form
            toggleDisplays(dataDisplay, updateExistingTodoDataForm);

            // populate update-existing form
            updateExistingTodoDataForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoItemFormFields(todoItemId);

            // handle form submission
            const submitFormBtn = updateExistingTodoDataForm.querySelector("#submit-form-btn");
            submitFormBtn.addEventListener("click", (event) => {
                // prevent default form submission behaviour
                event.preventDefault();

                const formData = handleFormLogic.getFormData(updateExistingTodoDataForm);
                handleFormLogic.handleInvalidInput(formData);
                handleFormLogic.handleTitleDuplicates("todo-item", updateExistingTodoDataForm.querySelector("#item-title"));
                handleFormLogic.sendUpdatedFormData("todo-item", formData, todoItemId);

                // toggle visibility of data-display container and update-existing form
                toggleDisplays(dataDisplay, updateExistingTodoDataForm);

                // update text content of todo item element html
                try {
                    const todoItemData = JSON.parse(localStorage.getItem("todoAppData"))["todoItems"].find(item => item.id === todoItemId);
                    todoDataDisplayer.updateTodoItemElement(itemEl, todoItemData);
                } catch (error) {
                    console.log("Error:", error);
                }
            })

            // handle closing form
            const closeFormBtn = updateExistingTodoDataForm.querySelector("#close-form-btn");
            closeFormBtn.addEventListener("click", () => {
                // toggle visibility of data-display container and update-existing form
                toggleDisplays(dataDisplay, updateExistingTodoDataForm);
            })
        });
        // set event listeners for deletion interaction
        deleteItemBtn.addEventListener("click", (event) => {
            // delete todo item and remove from dom
            deleteTodoItemFromStorage(itemEl);
            itemEl.remove();
        });
    })

    // selected todo list logic (updating, deleting)
    const todoList = dataDisplay.querySelector(".todo-list");
    const todoListId = todoList.dataset.id;
    const updateListBtn = dataDisplay.querySelector(".update-list-btn");
    const deleteListBtn = dataDisplay.querySelector(".delete-list-btn");

    // set event listeners for update interaction
    updateListBtn.addEventListener("click", (event) => {
        // toggle visibility of data-display container and update-existing form
        toggleDisplays(dataDisplay, updateExistingTodoDataForm);
        // populate update-existing form
        updateExistingTodoDataForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoListFormFields(todoList.dataset.id);

        // handle form submission
        const submitFormBtn = updateExistingTodoDataForm.querySelector("#submit-form-btn");
        submitFormBtn.addEventListener("click", (event) => {
            // prevent default form submission behaviour
            event.preventDefault();

            const formData = handleFormLogic.getFormData(updateExistingTodoDataForm);
            handleFormLogic.handleInvalidInput(formData);
            handleFormLogic.handleTitleDuplicates("todo-list", updateExistingTodoDataForm.querySelector("#list-title"));
            handleFormLogic.sendUpdatedFormData("todo-list", formData, todoListId);

            // toggle visibility of data-display container and update-existing form
            toggleDisplays(dataDisplay, updateExistingTodoDataForm);

            // update text content of todo list element html
            try {
                const todoListData = JSON.parse(localStorage.getItem("todoAppData"))["todoLists"].find(list => list.id === todoListId);
                todoDataDisplayer.updateTodoListElement(todoList, todoListData);
            } catch (error) {
                console.log("Error:", error);
            }

            // update options for specific todo list selection
            todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();
        })

        // handle closing form
        const closeFormBtn = updateExistingTodoDataForm.querySelector("#close-form-btn");
        closeFormBtn.addEventListener("click", () => {
            // toggle visibility of data-display container and update-existing form
            toggleDisplays(dataDisplay, updateExistingTodoDataForm);
        })
    });
    
    // set event listener for deletion interaction
    deleteListBtn.addEventListener("click", (event) => {
        // delete todo item and remove from dom
        deleteTodoListFromStorage(todoList);
        todoList.remove();
        // update options for specific todo list selection
        todoListDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown();
    });
});

// manual testing

// CREATING NEW TODO ITEMS
// console.log(createTodoItem(["kitty", "a meowing cat", "2026-04-17", "high", "defaultList"]));
// console.log(createTodoList(["turkish van toys", "meow, meow, meow! more catnip, please!"]));
// const item = createTodoItem(["kitty", "a meowing cat", "2026-04-17", "high", "defaultList"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "defaultList"]);
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);

// CREATING NEW TODO LISTS
// const list = createTodoList(["tabby cat troubles", "pspspsps! there's not enough laser pens!"]);
// addTodoListToStorage(list);

// NOTE: when manually testing deleting or updating a todo item/list, be sure to first comment out the code to create and add new items/lists, else the program will delete/update the specified item/list, then add new items/lists (upon refresh to update localStorage, the program runs again)

// DELETING TODO ITEMS
// const item = createTodoItem(["kitty", "a meowing cat", "2026-04-17", "high", "defaultList"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "defaultList"]);
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// deleteTodoItemFromStorage("");

// DELETING TODO LISTS
// add new lists
// const list = createTodoList(["tabby troubles", "..."]);
// const list2 = createTodoList(["bengal biscuits", "..."]);
// addTodoListToStorage(list);
// addTodoListToStorage(list2);
// // // add new items
// const item = createTodoItem(["tortoiseshell", "a sleeping cat", "2026-04-17", "high", "tabby troubles"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "tabby troubles"]);
// const item3 = createTodoItem(["bengal", "a meowing cat", "2026-09-14", "medium", "bengal biscuits"]);
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// addTodoItemToStorage(item3);
// delete a list (should delete the list + the todo items under it)
// deleteTodoListFromStorage("");

// UPDATING TODO ITEMS
// add new items
// const item = createTodoItem(["tortoiseshell", "a sleeping cat", "2026-04-17", "high", "Default Tuxedo"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "Default Tuxedo"]);
// const item3 = createTodoItem(["bengal", "a meowing cat", "2026-09-14", "medium", "Default Tuxedo"]);
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// addTodoItemToStorage(item3);
// update an item
// updateTodoItemInStorage(["tortoiseshell", "a yawning cat", "2026-01-01", "medium", "Default Tuxedo"], "af1f871c-c109-45d7-9ddf-c111e1a4b7e1");

// UPDATING TODO LISTS
// add new lists
// const list = createTodoList(["tabby troubles", "..."]);
// const list2 = createTodoList(["bengal biscuits", "..."]);
// addTodoListToStorage(list);
// addTodoListToStorage(list2);
// update a list
// updateTodoListInStorage(["chartreux chuckles", "meow, world!"], "66f8b0ec-ec58-4a49-ac61-c56fdb71f445");

// POPULATING A SELECT ELEMENT W/ OPTIONS
// const todoDropdown = document.querySelector("#todo-list-dropdown");
// todoDropdown.innerHTML = dynamicHTMLPopulator.populateTodoListDropdown(todoDropdown);
// // add new lists
// const list = createTodoList(["tabby troubles", "..."]);
// const list2 = createTodoList(["bengal biscuits", "..."]);
// addTodoListToStorage(list);
// addTodoListToStorage(list2);

// POPULATING "CREATE NEW" FORM W/ TODO ITEM FIELDS AND TODO LIST FIELDS
// createNewForm.innerHTML = dynamicHTMLPopulator.populateTodoListFormFields();
// createNewForm.innerHTML = dynamicHTMLPopulator.populateTodoItemFormFields();

// POPULATING "UPDATE EXISTING" FORM W/ TODO ITEM FIELDS AND TODO LIST FIELDS
// create new items
// const item = createTodoItem(["tortoiseshell", "a sleeping cat", "2026-04-17", "high", "Default Tuxedo"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "Default Tuxedo"]);
// const item3 = createTodoItem(["bengal", "a meowing cat", "2026-09-14", "medium", "Default Tuxedo"]);
// // add new items
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// addTodoItemToStorage(item3);
// populate form
// const updateExistingForm = document.querySelector("#update-existing");
// updateExistingForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoListFormFields("c01f15f3-15f5-4f7c-8e63-c4024659e052");
// updateExistingForm.innerHTML = dynamicHTMLPopulator.populateExistingTodoItemFormFields("0eebfca4-3535-491e-b8df-4cce28b2ff9c");

// DOM MANIPULATION
// add new lists
// const list = createTodoList(["tabby troubles", "..."]);
// const list2 = createTodoList(["bengal biscuits", "..."]);
// addTodoListToStorage(list);
// addTodoListToStorage(list2);
// // create new items
// const item = createTodoItem(["tortoiseshell", "a sleeping cat", "2026-04-17", "high", "Default Tuxedo"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "tabby troubles"]);
// const item3 = createTodoItem(["bengal", "a meowing cat", "2026-09-14", "medium", "bengal biscuits"]);
// // add new items
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// addTodoItemToStorage(item3);
// const item4 = createTodoItem(["turkish van", "a swimming cat", "2026-01-15", "medium", "Default Tuxedo"]);
// addTodoItemToStorage(item4);
// display select todo list and children
// dataDisplay.innerHTML = todoDataDisplayer.displayAllTodoItems();
// dataDisplay.innerHTML = todoDataDisplayer.displayAllTodoLists();


