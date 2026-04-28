// imports
import initlocalStorageData from "./onPageLoad.js";
import createTodoItem from "./crud-ops/createTodoItem.js";
import createTodoList from "./crud-ops/createTodoList.js";
import addTodoItemToStorage from "./crud-ops/addTodoItemToStorage.js";
import addTodoListToStorage from "./crud-ops/addTodoListToStorage.js";
import deleteTodoItemFromStorage from "./crud-ops/deleteTodoItemFromStorage.js";
import deleteTodoListFromStorage from "./crud-ops/deleteTodoListFromStorage.js";
import updateTodoItemInStorage from "./crud-ops/updateTodoItemInStorage.js";
import updateTodoListInStorage from "./crud-ops/updateTodoListInStorage.js";
import * as dynamicHTMLPopulator from "./dynamicHtmlPopulation.js";
import * as todoDataDisplayer from "./crud-ops/displayTodoDataFromStorage.js";

// check for and initialize app data upon complete page load
window.addEventListener("load", initlocalStorageData);

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
// // add new items
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
const createNewForm = document.querySelector("#create-new");
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
const dataDisplay = document.querySelector("#data-display");
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


