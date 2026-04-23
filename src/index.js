// imports
import initlocalStorageData from "./onPageLoad.js";
import createTodoItem from "./crud-ops/createTodoItem.js";
import createTodoList from "./crud-ops/createTodoList.js";
import addTodoItemToStorage from "./crud-ops/addTodoItemToStorage.js";
import addTodoListToStorage from "./crud-ops/addTodoListToStorage.js";
import deleteTodoItemFromStorage from "./crud-ops/deleteTodoItemFromStorage.js";
import deleteTodoListFromStorage from "./crud-ops/deleteTodoListFromStorage.js";

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

// NOTE: when manually testing deleting a todo item/list, be sure to first comment out the code to create and add new items/lists, else the program will delete the specified item/list, then add new items/lists (upon refresh to update localStorage, the program runs again)

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