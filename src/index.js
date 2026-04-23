// imports
import initlocalStorageData from "./onPageLoad.js";
import createTodoItem from "./crud-ops/createTodoItem.js";
import createTodoList from "./crud-ops/createTodoList.js";
import addTodoItemToStorage from "./crud-ops/addTodoItemToStorage.js";
import addTodoListToStorage from "./crud-ops/addTodoListToStorage.js";
import deleteTodoItemFromStorage from "./crud-ops/deleteTodoItemFromStorage.js";

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

// DELETING TODO ITEMS
// const item = createTodoItem(["kitty", "a meowing cat", "2026-04-17", "high", "defaultList"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "defaultList"]);
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// deleteTodoItemFromStorage("");
// NOTE: when manually testing deleting a todo item, be sure to first comment out the code to create and add new items, else the program will delete the specified item, then add new items (upon refresh to update localStorage, the program runs again)

